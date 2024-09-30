import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Input, Text } from '@ui-kitten/components'

interface BuyerInfoProps {
    buyerData: {
        companyName: string
        address: string
        taxNumber: string
    }
    handleInputChange: (field: string, value: string) => void
}

export const BuyerInfo: React.FC<BuyerInfoProps> = ({ buyerData, handleInputChange }) => {
  const inputFields = [
    { label: 'Company Name', placeholder: 'Enter Company Name', value: buyerData.companyName, field: 'buyer.companyName' },
    { label: 'Address', placeholder: 'Enter Address', value: buyerData.address, field: 'buyer.address', multiline: true },
    { label: 'Tax Number (NIP)', placeholder: 'Enter Tax Number', value: buyerData.taxNumber, field: 'buyer.taxNumber' },
  ]

  return (
    <Layout
      style={styles.container}
      level="1"
    >
      <Text
        status="basic"
        category="h6"
      >
        Buyer Information (Nabywca)
      </Text>

      {inputFields.map(({ label, placeholder, value, field, multiline = false }, index) => (
        <Input
          key={index}
          label={label}
          placeholder={placeholder}
          value={value}
          multiline={multiline}
          textStyle={multiline ? { minHeight: 64 } : undefined}
          onChangeText={(inputValue) => handleInputChange(field, inputValue)}
        />
      ))}
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
})
