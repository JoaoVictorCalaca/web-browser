import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { appColors } from '../util/colors'
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const UrlNotFound = ({ url, setHasError, setUrl }) => {
  const retrySearch = () => {
    setHasError(false)
    setUrl(`google.com/search?q=${url}`)
  };

  return (
    <LinearGradient colors={[appColors.purple, appColors.lightGray, appColors.dark]} style={styles.errorContainer}>
      <Ionicons name='warning' color={'yellow'} size={105} />

      <View>
        <Text style={styles.errorMessage}>Não foi possível conectar-se à <Text style={[styles.errorMessage, { color: appColors.lightPurple, textDecorationLine: 'underline' }]}>'{url}'</Text></Text>

        <TouchableOpacity style={styles.retryButton} onPress={retrySearch}>
          <Text style={styles.text}>Buscar na web </Text>
          <Ionicons name='logo-google' color={'#fff'} size={30}/>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.dark,
    padding: 30,
    gap: 50
  },
  
  errorMessage: {
    color: 'white',
    fontSize: 25,
    marginBottom: 20,
  },

  retryButton: {
    backgroundColor: appColors.purple,
    padding: 12,
    borderRadius: 20,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center'
  }
})

export default UrlNotFound