import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, FlatList, ScrollView, Modal, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { appColors } from '@/src/util/colors'
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import TabCard from '@/src/components/TabCard';
import { tabManager } from '@/src/util/manageTabs';

const imgSize = 200

const browserTabs = () => {
  const [tabs, setTabs] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState('')

  useEffect(() => {
    const loadTabs = async () => {
      const { tabs: savedTabs = [] } = await tabManager.loadTabs();
      if (savedTabs && savedTabs.length > 0) {
        setTabs(savedTabs);
      }
    };

    loadTabs();
  }, []);

  const createTab = async (url) => {
    const newTabs = [...tabs, url];
    setTabs(newTabs);
    await tabManager.saveTabs(newTabs);
  };

  const closeAllTabs = async () => {
    setTabs([]);
    await tabManager.clearTabs();
  };

  const closeTab = async (index) => {
    const updatedTabs = tabs.filter((_, tabIndex) => tabIndex !== index);
    setTabs(updatedTabs);
    await tabManager.saveTabs(JSON.stringify(updatedTabs))
  };

  const isValidUrl = (url) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' +
      '((([a-z0-9\\-]+)\\.)+[a-z]{2,}|localhost|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z0-9@:%_\\+.~#?&//=]*)?$',
      'i'
    );
    return pattern.test(url);
  };

  const handleSearch = async () => {
    let newTabUrl;

    if (isValidUrl(query)) {
      newTabUrl = query
    } else {
      newTabUrl = `https://www.google.com/search?q=${query}`
    }

    await createTab(newTabUrl);

    setQuery('');
  };

  const renderTabs = ({ item, index }) => (<TabCard url={item} closeTab={() => closeTab(index)} />);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.defaultText}>Guias</Text>
        <View>
          <TouchableOpacity onPress={closeAllTabs} style={styles.btnDelete}>
            <Text style={styles.defaultText}>Fechar todas</Text>
            <Ionicons color={'#fff'} size={24} name='trash-outline' />
          </TouchableOpacity>
        </View>
      </View>

      {tabs.length < 1 ? (
        <View style={styles.noTabsContainer}>
          <Image resizeMode='cover' source={require('../../../assets/images/rocketman.png')} style={styles.img} />

          <View>
            <Text style={styles.defaultText}>Adicionar guia para navegação {tabs}</Text>
            <Text style={styles.secondaryText}>Toque + para abrir uma nova guia</Text>
          </View>
        </View>
      ) : (
        <View style={styles.tabsContainer}>
          <FlatList
            data={tabs}
            contentContainerStyle={styles.flatList}
            numColumns={2}
            columnWrapperStyle={{ gap: 15 }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderTabs}
          />
        </View>
      )}

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.newTab}>
        <Ionicons name='add-circle' color={appColors.purple} size={60} />
      </TouchableOpacity>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.newTabContainer}>
          <Text style={styles.defaultText}>Pesquisa</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              keyboardType="url"
              style={styles.search}
              returnKeyType="search"
              placeholder="Pesquisar"
              placeholderTextColor={'#ccc'}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={() => { setModalVisible(false); handleSearch() }} />
            <Ionicons name="search-sharp" size={28} color={appColors.purple} />
          </View>

          <TouchableOpacity style={styles.inputContainer} onPress={() => setModalVisible(false)}>
            <Text style={styles.defaultText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <StatusBar />
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

  img: {
    width: imgSize,
    height: imgSize
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 18,
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
    flexDirection: 'row',
    gap: 8,
    padding: 8
  },

  noTabsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
    flex: 1,
  },

  tabsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    padding: 20
  },

  flatList: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    gap: 15
  },

  newTab: {
    position: 'absolute',
    bottom: 15,
    right: 15
  },

  newTabContainer: {
    backgroundColor: appColors.gray,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 20,
    position: 'relative',
    top: '30%',
    padding: 12,
    borderRadius: 20
  },

  inputContainer: {
    flexDirection: 'row',
    borderRadius: 115,
    borderWidth: 2,
    borderColor: appColors.gray,
    paddingHorizontal: 27,
    height: 55,
    backgroundColor: 'rgba(13, 13, 13, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: '100%',
    elevation: 1
  },

  search: {
    color: '#fff',
    width: '80%',
    fontSize: 17,
  },
})

export default browserTabs