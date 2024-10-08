import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import { StatusBar } from 'expo-status-bar'

const chatAi = () => {
  return (
    <View style={styles.container}>
      <WebView style={styles.page} source={{ uri: 'https://chatgpt.com' }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },

  page: {
    flex: 1,
    width: "100%"
  }
})

export default chatAi