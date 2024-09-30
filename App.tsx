import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { InvoiceInfo } from './src/components/InvoiceInfo'
import { SellerInfo } from './src/components/SellerInfo'
import { BuyerInfo } from './src/components/BuyerInfo'
import { FooterInfo } from './src/components/FooterInfo'
import { downloadInvoice } from './src/utils/createPDF'
import { ItemInfo } from './src/components/ItemInfo'
import { ThemedButton } from 'react-native-really-awesome-button'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, Text } from '@ui-kitten/components'

interface Seller {
  name: string
  address: string
  address2?: string
  taxNumber: string
  bankName: string
  bankAccountNumber: string
  bankSwiftAddress: string
}

interface Buyer {
  companyName: string
  address: string
  taxNumber: string
}

interface Item {
  description: string
  price: string
  vatPercent: number
}

interface InvoiceData {
  invoiceNumber: string
  issueDate: string
  saleDate: string
  seller: Seller
  buyer: Buyer
  item: Item
  footerName: string
}

const App: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: '',
    issueDate: '',
    saleDate: '',
    seller: {
      name: '',
      address: '',
      address2: '',
      taxNumber: '',
      bankName: '',
      bankAccountNumber: '',
      bankSwiftAddress: '',
    },
    buyer: { companyName: '', address: '', taxNumber: '' },
    item: { description: '', price: '', vatPercent: 23 },
    footerName: '',
  })

  useEffect(() => {
    const savedData = localStorage.getItem('invoiceData')
    if (savedData) {
      setInvoiceData(JSON.parse(savedData) as InvoiceData)
    }
  }, [])

  const handleInputChange = (field: string, value: string | number) => {
    const fieldParts = field.split('.')

    if (fieldParts.length === 1) {
      const updatedData = { ...invoiceData, [field]: value }
      setInvoiceData(updatedData)
      localStorage.setItem('invoiceData', JSON.stringify(updatedData))
    } else {
      const [mainField, subField] = fieldParts

      if (mainField in invoiceData && typeof invoiceData[mainField as keyof InvoiceData] === 'object') {
        const updatedMainField = {
          ...(invoiceData[mainField as keyof InvoiceData] as Record<string, any>), // Cast to an object with string keys
          [subField]: value,
        }

        const updatedData = {
          ...invoiceData,
          [mainField]: updatedMainField,
        }

        setInvoiceData(updatedData)
        localStorage.setItem('invoiceData', JSON.stringify(updatedData))
      }
    }
  }

  return (

    <ApplicationProvider
      {...eva}
      theme={{ ...eva.light }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 1, paddingBottom: 25 }}>
          <Text category={'h2'}>Invoice Generator</Text>
          <InvoiceInfo
            invoiceData={invoiceData}
            handleInputChange={handleInputChange}
          />
          <SellerInfo
            sellerData={invoiceData.seller}
            handleInputChange={handleInputChange}
          />
          <BuyerInfo
            buyerData={invoiceData.buyer}
            handleInputChange={handleInputChange}
          />
          <ItemInfo
            itemData={invoiceData.item}
            handleInputChange={handleInputChange}
          />
          <FooterInfo
            footerName={invoiceData.footerName}
            handleInputChange={handleInputChange}
          />
          <View style={styles.buttonContainer}>
            <ThemedButton
              progress
              size={'large'}
              style={{
                alignSelf: 'center'
              }}
              name="bruce"
              type="anchor"
              onPress={(release) => downloadInvoice(invoiceData, release)}
            >
              Download Invoice
            </ThemedButton>

          </View>
        </View>
      </ScrollView>
    </ApplicationProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: 20,
    width: '100%',
  },
})

export default App
