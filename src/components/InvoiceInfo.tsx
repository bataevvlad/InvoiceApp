import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Datepicker, Layout, Input, Text } from '@ui-kitten/components'
import { createUTCDate } from '../utils/createUTCDate'

interface InvoiceInfoProps {
    invoiceData: {
        invoiceNumber: string
        issueDate: string
        saleDate: string
    }
    handleInputChange: (field: string, value: string) => void
}

export const InvoiceInfo: React.FC<InvoiceInfoProps> = ({ invoiceData, handleInputChange }) => {
  const [issueDate, setIssueDate] = React.useState<Date | null>(createUTCDate(invoiceData.issueDate))
  const [saleDate, setSaleDate] = React.useState<Date | null>(createUTCDate(invoiceData.saleDate))

  useEffect(() => {
    setIssueDate(createUTCDate(invoiceData.issueDate))
    setSaleDate(createUTCDate(invoiceData.saleDate))
  }, [invoiceData.issueDate, invoiceData.saleDate])

  const handleDateChange = (field: string, date: Date | null) => {
    if (date) {
      const formattedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
        .toISOString()
        .split('T')[0]
      handleInputChange(field, formattedDate)
    }
  }

  const inputFields: any[] = [
    { label: 'Faktura nr', placeholder: 'Faktura nr', value: invoiceData.invoiceNumber, field: 'invoiceNumber', type: 'input' },
    { label: 'Data wystawienia', value: issueDate, field: 'issueDate', type: 'datepicker', onSelect: setIssueDate },
    { label: 'Data sprzedaży', value: saleDate, field: 'saleDate', type: 'datepicker', onSelect: setSaleDate },
  ]

  return (
    <Layout
      style={styles.inputContainer}
      level="1"
    >
      <Text
        category={'h6'}
        status={'basic'}
      >
        Invoice Information
      </Text>

      {inputFields.map(({ label, placeholder, value, field, type, onSelect }, index) =>
        type === 'input' ? (
          <Input
            key={index}
            label={label}
            placeholder={placeholder}
            value={value}
            onChangeText={(inputValue) => handleInputChange(field, inputValue)}
          />
        ) : (
          <Datepicker
            key={index}
            label={label}
            date={value}
            onSelect={(nextDate) => {
              onSelect(nextDate)
              handleDateChange(field, nextDate)
            }}
          />
        )
      )}
    </Layout>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
})
