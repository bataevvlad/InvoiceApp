import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { calculateDueDate, calculateTotals } from './calcHelpers'
import { convertTotalToPolishWords } from './totalInWords'
import { font } from '../../LiberationSans-Regular-normal'

interface InvoiceData {
  invoiceNumber: string
  issueDate: string
  saleDate: string
  seller: {
    name: string
    address: string
    address2?: string
    taxNumber: string
    bankName: string
    bankAccountNumber: string
    bankSwiftAddress: string
  }
  buyer: {
    companyName: string
    address: string
    taxNumber: string
  }
  item: {
    description: string
    price: string
    vatPercent: number
  }
  footerName: string
}

// Helper function to generate tables
const generateTable = (
  doc: jsPDF,
  tableBody: any[][],
  theme: 'plain' | 'striped' | 'grid' = 'plain',
  head: string[] | null = null,
  options: any = {}
) => {
  autoTable(doc, {
    head: head ? [head] : undefined,
    body: tableBody,
    theme,
    styles: {
      font: 'LiberationSans-Regular',
      fontSize: 12,
      cellPadding: 2,
      ...options.styles,
    },
    headStyles: {
      fillColor: '#343a40',
      textColor: '#ffffff',
      font: 'LiberationSans-Regular',
      ...options.headStyles,
    },
    didDrawCell: function () {
      doc.setFont('LiberationSans-Regular')
    },
    ...options,
  })
}

export const downloadInvoice = (invoiceData: InvoiceData, release: any): void => {
  const doc = new jsPDF()

  // Add the custom Liberation Sans font
  doc.addFileToVFS('LiberationSans-Regular-normal.ttf', font)
  doc.addFont('LiberationSans-Regular-normal.ttf', 'LiberationSans-Regular', 'normal')
  doc.setFont('LiberationSans-Regular')

  // Calculate totals
  const { price, vatPercent } = invoiceData.item
  const parsedPrice = parseFloat(price) || 0
  const { vatAmount, total } = calculateTotals(parsedPrice, vatPercent)

  // Convert total to words in Polish
  const totalInWords = convertTotalToPolishWords(Number(total))
  const currentYear = new Date().getFullYear()

  // Invoice Header using generateTable on the right side with styles
  generateTable(doc, [
    [
      {
        content: `Faktura nr: ${invoiceData.invoiceNumber || 'N/A'}/${currentYear}`,
        styles: { halign: 'right', fontSize: 10 },
      },
    ],
    [
      {
        content: `Data wystawienia: ${invoiceData.issueDate || 'N/A'}`,
        styles: { halign: 'right', fontSize: 10 },
      },
    ],
    [
      {
        content: `Data sprzedaży: ${invoiceData.saleDate || 'N/A'}`,
        styles: { halign: 'right', fontSize: 10 },
      },
    ],
    [
      {
        content: `Termin płatności: ${calculateDueDate(invoiceData.saleDate) || 'N/A'}`,
        styles: { halign: 'right', fontSize: 10 },
      },
    ],
    [
      {
        content: 'Metoda płatności: przelew',
        styles: { halign: 'right', fontSize: 10 },
      },
    ],
  ], 'grid', undefined, {
    margin: { left: doc.internal.pageSize.width / 1.5 }, // Align to the right
    styles: {
      font: 'LiberationSans-Regular',
      fontSize: 10,
      overflow: 'linebreak',
      cellPadding: 2,
      lineWidth: 0.1, // Border thickness
      lineColor: [0, 0, 0], // Black border color
      textColor: [0, 0, 0], // Black text color
    },
    headStyles: {
      fillColor: [52, 58, 64], // Dark grey background for header
      textColor: [255, 255, 255], // White text for header
      fontSize: 10,
    },
    bodyStyles: {
      fillColor: [240, 240, 240], // Light grey background for body
      textColor: [0, 0, 0], // Black text for body
    },
    alternateRowStyles: {
      fillColor: [255, 255, 255], // White for alternating rows
    },
    tableLineColor: [0, 0, 0], // Black border color for table
    tableLineWidth: 0.1, // Table border thickness
  })



  // Seller and Buyer Information
  generateTable(doc, [
    [
      {
        content: `Sprzedawca:\n${invoiceData.seller.name || 'N/A'}\nul. ${invoiceData.seller.address || 'N/A'}\n${invoiceData.seller.address2 || ''}\nNIP: ${invoiceData.seller.taxNumber || 'N/A'}\n${invoiceData.seller.bankName || 'N/A'}\n${invoiceData.seller.bankAccountNumber || 'N/A'}\n${invoiceData.seller.bankSwiftAddress || 'N/A'}`,
        styles: { halign: 'left', fontSize: 11 },
      },
      {
        content: `Nabywca:\n${invoiceData.buyer.companyName || 'N/A'}\nul. ${invoiceData.buyer.address || 'N/A'}\nNIP: ${invoiceData.buyer.taxNumber || 'N/A'}`,
        styles: { halign: 'right', fontSize: 11 },
      },
    ],
  ], 'plain')

  // Product Table
  generateTable(doc, [
    ['1', invoiceData.item.description || 'N/A', 'usł.', '1', `${parsedPrice.toFixed(2)}`, `${vatPercent}%`, `${parsedPrice.toFixed(2)}`, `${total.toFixed(2)}`],
  ], 'striped', ['Lp', 'Nazwa', 'Jedn', 'Ilość', 'Cena netto', 'Stawka VAT', 'Wartość netto', 'Wartość brutto'])

  // Get the current page width for positioning
  const pageWidth = doc.internal.pageSize.width
  const halfPageWidth = pageWidth / 2  // Calculate half width of the page

  debugger
  // VAT breakdown table on the left
  autoTable(doc, {
    head: [['Stawka VAT', 'Wartość netto', 'Kwota VAT', 'Wartość brutto']],
    body: [
      [`${vatPercent}%`, `${parsedPrice.toFixed(2)} PLN`, `${vatAmount.toFixed(2)} PLN`, `${total.toFixed(2)} PLN`],
      ['Razem', `${parsedPrice.toFixed(2)} PLN`, `${vatAmount.toFixed(2)} PLN`, `${total.toFixed(2)} PLN`],
    ],
    startY: (doc as any).previousAutoTable.finalY + 10,
    tableWidth: halfPageWidth,
    theme: 'striped',
    styles: {
      font: 'LiberationSans-Regular',
      fontSize: 10,
    },
    headStyles: {
      fillColor: '#343a40',
      textColor: '#ffffff',
    },
    didDrawCell: function () {
      doc.setFont('LiberationSans-Regular')
    },
  })

  // Totals Section with words
  generateTable(doc, [
    [{
      content: 'Zapłacono:',
      styles: { halign: 'right' }
    },
    {
      content: '0 PLN',
      styles: { halign: 'right' }
    }],
    [{
      content: 'Do zapłaty:',
      styles: { halign: 'right' }
    }, {
      content: `${total.toFixed(2)} PLN`,
      styles: { halign: 'right' }
    }],
    [{
      content: 'Razem:',
      styles: { halign: 'right', fontSize: 14, fontStyle: 'bold' }
    },
    {
      content: `${total.toFixed(2)} PLN`,
      styles: { halign: 'right', fontSize: 14, fontStyle: 'bold' }
    }],
  ], 'plain', undefined, {
    startY: (doc as any).previousAutoTable.finalY + 10,
    margin: { left: doc.internal.pageSize.width / 2 }, // Place this in the right half of the page
  })


  generateTable(doc, [
    [
      {
        content: `Słownie: ${totalInWords}`,
        styles: { halign: 'left', fontSize: 8 },
      },
    ],
  ], 'plain', undefined, {
    startY: (doc as any).previousAutoTable.finalY,
    margin: { left: (doc.internal.pageSize.width / 2) + 40 }, // Place this in the right half of the page
  })

  // Footer section
  const pageHeight = doc.internal.pageSize.height
  const footerYPosition = pageHeight - 30
  autoTable(doc, {
    body: [
      [
        {
          content: `${invoiceData.footerName || 'N/A'}\nImię i nazwisko osoby uprawnionej do wystawiania faktury`,
          styles: { halign: 'center', fontSize: 8 },
        },
      ],
    ],
    startY: footerYPosition, // Position footer at the bottom
    theme: 'plain',
    styles: {
      font: 'LiberationSans-Regular',
      fontSize: 8,
    },
    headStyles: {
      fillColor: '#343a40',
      textColor: '#ffffff',
      font: 'LiberationSans-Regular',
    },
    didDrawCell: function () {
      doc.setFont('LiberationSans-Regular')
    },
  })

  doc.save(`Faktura_FV_${invoiceData.invoiceNumber}.pdf`, { returnPromise: true }).finally(release)
}
