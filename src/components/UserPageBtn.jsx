import { View, Text, TouchableOpacity, StyleSheet, Alert, Share } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { appColors } from '../util/colors'

const UserPageBtn = ({onPress, label, icon}) => {
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
    gap: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: appColors.gray,
    borderRadius: 15,
  },

  label:{
    color: '#fff',
    fontSize: 17
  }
})

export default UserPageBtn