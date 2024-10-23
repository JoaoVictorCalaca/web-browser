import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { appColors } from '@/src/util/colors'
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import UserPageBtn from '@/src/components/UserPageBtn';

const user = () => {
  return (
    <LinearGradient
      colors={[appColors.purple, appColors.lightGray, appColors.dark]}
      style={styles.container}
    >
      <View style={styles.userDtails}>
        <Image style={styles.profilePic} source={require('../../../assets/images/cr7DeBigode.jpg')} />
        <View>
          <Text style={styles.h1}>CR7 de bigode</Text>
          <Text style={styles.h2}>cr7@mail.com</Text>
        </View>
      </View>

      <View style={styles.preferences}>
        <TouchableOpacity style={styles.preferenceBtn}>
          <Ionicons name='chatbox-ellipses-outline' color={appColors.purple} size={40} />
          <Text style={styles.h1}>AI</Text>
          <Text style={styles.h2}>ChatGpt</Text>
        </TouchableOpacity>

        <View style={{ height: '70%', width: 3, backgroundColor: appColors.lightGray }}/>

        <TouchableOpacity style={styles.preferenceBtn}>
          <Ionicons name='search-circle-outline' color={appColors.purple} size={40} />
          <Text style={styles.h1}>Site de busca</Text>
          <Text style={styles.h2}>Google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnArea}>
        <UserPageBtn icon={'create-outline'} label={'Editar nome de usuário'} onPress={()=>{}}/>
        <UserPageBtn icon={'at-outline'} label={'Editar email'} onPress={()=>{}}/>
        <UserPageBtn icon={'hourglass-outline'} label={'Gerenciar histórico'} onPress={()=>{}}/>
        <UserPageBtn icon={'bookmark-outline'} label={'Gerenciar favoritos'} onPress={()=>{}}/>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Constants.statusBarHeight + 5,
    gap: 25
  },

  userDtails: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center'
  },

  profilePic: {
    borderRadius: 1000,
    borderColor: '#fff',
    borderWidth: 3,
    width: 110,
    aspectRatio: '1/1'
  },

  h1: {
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold'
  },

  h2: {
    color: '#fff',
    fontSize: 17
  },

  preferences: {
    backgroundColor: appColors.gray,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 15,
    alignItems: 'center'
  },

  preferenceBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    gap: 10,
    padding: 12
  },

  btnArea: {
    gap: 15
  }
})

export default user