import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Input } from '@ui-kitten/components'

interface FooterInfoProps {
  footerName: string
  handleInputChange: (field: string, value: string) => void
}

export const FooterInfo: React.FC<FooterInfoProps> = ({ footerName, handleInputChange }) => {
  return (
    <Layout
      style={styles.container}
      level="1"
    >
      <Input
        label="Footer Name"
        placeholder="Enter Footer Name"
        value={footerName}
        onChangeText={(value) => handleInputChange('footerName', value)}
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }
})
