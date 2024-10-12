import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import { Ionicons } from '@expo/vector-icons'
import { appColors } from '../util/colors'

const TabCard = ({ url, index, closeTab }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.title}>{url}</Text>
        <Pressable onPress={()=> closeTab(index)}>
          <Ionicons name='close' color={appColors.dark} size={20} />
        </Pressable>
      </View>
      <WebView
        source={{ uri: url }}
        startInLoadingState={true}
        style={styles.page}
        pointerEvents={'none'}
        scrollEnabled={false}
        javaScriptEnabled={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 210,
    borderWidth: 4,
    borderColor: '#fff',
  },

  page: {
    flex: 1,
    width: '100%',
  },

  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12
  },

  title: {
    fontSize: 18
  }
})

export default TabCard