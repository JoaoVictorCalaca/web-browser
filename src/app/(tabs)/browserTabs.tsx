import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { appColors } from '@/src/util/colors'

const browserTabs = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.defaultText}>Guias</Text>
        <View>
          <TouchableOpacity style={styles.btnDelete}>
            <Text style={styles.defaultText}>Fechar todas</Text>
            <Ionicons color={'#fff'} size={24} name='trash-sharp' />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.noTabsContainer}>
        <Ionicons name='rocket-sharp' color={appColors.lightPurple} size={130} />
        <View>
          <Text style={styles.defaultText}>Não há guias abertas</Text>
          <Text style={styles.secondaryText}>Toque + para adicionar</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.newTab}>
        <Ionicons name='add-circle' color={appColors.purple} size={60}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    backgroundColor: appColors.dark
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingTop: 45,
    paddingBottom: 15,
    backgroundColor: appColors.gray
  },

  defaultText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  secondaryText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center'
  },

  btnDelete: {
    backgroundColor: appColors.purple,
    borderRadius: 100,
    flexDirection: 'row',
    gap: 8,
    padding: 8
  },

  noTabsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 25
  },

  newTab: {
    position: 'absolute',
    bottom: 15,
    right: 15
  }
})

export default browserTabs