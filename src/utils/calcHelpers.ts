// Helper to calculate due date (15 days after sale date)
export const calculateDueDate = (saleDate: string): string => {
  const date = new Date(saleDate)
  date.setDate(date.getDate() + 15)
  return date.toISOString().split('T')[0]
}

// Helper to calculate VAT and totals
interface Totals {
  vatAmount: number
  total: number
}

export const calculateTotals = (price: number, vatPercent: number): Totals => {
  const vatAmount = price * (vatPercent / 100)
  const total = price + vatAmount
  return { vatAmount, total }
}
