import { View, Text, TouchableOpacity, StyleSheet, Alert, Share } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { appColors } from '../util/colors'

const BottomSheetBtn = ({onPress, url, label, icon}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Ionicons name={icon} color={'#fff'} size={24}/>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    width: '100%',
    gap: 15,
    padding: 8
  },

  label:{
    color: '#fff',
    fontSize: 17
  }
})

export default BottomSheetBtn