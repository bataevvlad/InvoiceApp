import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Input, Text } from '@ui-kitten/components'

interface ItemInfoProps {
    itemData: {
        description: string
        price: string
        vatPercent: number
    }
    handleInputChange: (field: string, value: string | number) => void
}

export const ItemInfo: React.FC<ItemInfoProps> = ({ itemData, handleInputChange }) => {
  const inputFields: any[] = [
    { label: 'Item Description', placeholder: 'Enter Item Description', value: itemData.description, field: 'item.description', multiline: true },
    { label: 'Item Price', placeholder: 'Enter Item Price', value: itemData.price, field: 'item.price', keyboardType: 'numeric' },
    { label: 'VAT Percent', placeholder: 'Enter VAT Percent', value: `${itemData.vatPercent}`, field: 'item.vatPercent', keyboardType: 'numeric' },
  ]

  return (
    <Layout
      style={styles.container}
      level="1"
    >
      <Text
        category="h6"
        status="basic"
      >
        Item Information
      </Text>

      {inputFields.map(({ label, placeholder, value, field, keyboardType, multiline }, index) => (
        <Input
          key={index}
          label={label}
          placeholder={placeholder}
          value={value}
          textStyle={multiline ? { minHeight: 64 } : undefined}
          keyboardType={keyboardType || 'default'}
          multiline={multiline || false}
          onChangeText={(inputValue) =>
            handleInputChange(field, keyboardType === 'numeric' ? Number(inputValue) : inputValue)
          }
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
