import { appColors } from "@/src/util/colors";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useRef, useState } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity, Switch, ActivityIndicator, Share, Alert } from "react-native";
import { router } from "expo-router";
import { tabManager } from "@/src/util/manageTabs";

const backgrounds = [require('../../../assets/images/bg1.jpg'), require('../../../assets/images/bg2.jpg'), require('../../../assets/images/bg3.jpg'), require('../../../assets/images/bg4.jpg')]

export default function Index() {
  const [bg, setBg] = useState(null)
  const [query, setQuery] = useState('')
  const [privateSearch, setPrivateSearch] = useState(false);
  const [tabs, setTabs] = useState<string[]>([]);

  useEffect(() => {
    const handleBg = () => {
      const bgId = Math.floor(Math.random() * backgrounds.length)

      setBg(backgrounds[bgId])
    }

    const loadTabs = async () => {
      const {tabs: savedTabs = []} = await tabManager.loadTabs() || {};
      if (savedTabs) {
        setTabs(JSON.parse(savedTabs));
      }
    };

    loadTabs()
    handleBg()
  }, [])



  if (!bg) {
    return null
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const toggleSwitch = () => {
    setPrivateSearch(previousState => !previousState);
  }

  const handleSearch = async () => {
    const searchUrl = isValidUrl(query) ? query : `https://google.com/search?q=${query}`;
    const newTabs = [...tabs, searchUrl];
    setTabs(newTabs);
    await tabManager.saveTabs(newTabs);

    router.push({ pathname: './webview', params: { url: searchUrl } });
  };


  return (
    <ImageBackground
      style={styles.background}
      source={bg}
    >
      <View style={styles.container}>
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
            onSubmitEditing={handleSearch} />
          <Ionicons name="search-sharp" size={28} color={appColors.purple} />
        </View>

        <View style={styles.inputContainer}>
          <Switch
            trackColor={{ false: '#767577', true: appColors.lightPurple }}
            thumbColor={privateSearch ? appColors.purple : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={privateSearch}
          />
          <Text style={styles.defaultText}>Pesquisa anônima</Text>
          <Ionicons name="glasses-sharp" size={28} color={appColors.purple} />
        </View>
      </View>

      <StatusBar style='auto' translucent={true} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: '60%',
    paddingHorizontal: 20,
    gap: 20
  },

  defaultText: {
    fontSize: 20,
    color: '#fff'
  },

  background: {
    flex: 1,
    width: '100%'
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
