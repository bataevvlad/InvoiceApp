import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Input, Text } from '@ui-kitten/components'

interface SellerData {
    name: string
    address: string
    address2?: string
    taxNumber: string
    bankName: string
    bankAccountNumber: string
    bankSwiftAddress: string
}

interface SellerInfoProps {
    sellerData: SellerData
    handleInputChange: (field: string, value: string) => void
}

export const SellerInfo: React.FC<SellerInfoProps> = ({ sellerData, handleInputChange }) => {
  const inputFields = [
    { label: 'Name Surname', placeholder: 'Enter Seller Name', value: sellerData.name, field: 'seller.name' },
    { label: 'Address', placeholder: 'Enter Address', value: sellerData.address, field: 'seller.address' },
    { label: 'Address 2', placeholder: 'Enter Address 2', value: sellerData.address2 || '', field: 'seller.address2' },
    { label: 'Tax Number (NIP)', placeholder: 'Enter Tax Number', value: sellerData.taxNumber, field: 'seller.taxNumber' },
    { label: 'Bank Name', placeholder: 'Enter Bank Name', value: sellerData.bankName, field: 'seller.bankName' },
    { label: 'Bank Account Number', placeholder: 'Enter Bank Account Number', value: sellerData.bankAccountNumber, field: 'seller.bankAccountNumber' },
    { label: 'SWIFT and Bank Address', placeholder: 'Enter SWIFT and Bank Address', value: sellerData.bankSwiftAddress, field: 'seller.bankSwiftAddress', multiline: true },
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
        Seller Information (Sprzedawca)
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
