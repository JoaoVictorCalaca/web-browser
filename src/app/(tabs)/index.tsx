import { appColors } from "@/src/util/colors";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useRef, useState } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity, Switch, ActivityIndicator, Share, Alert } from "react-native";
import { router } from "expo-router";
import { tabManager } from "@/src/util/manageTabs";

const backgrounds = [require('../../../assets/images/bg1.png'), require('../../../assets/images/bg2.jpg'), require('../../../assets/images/bg3.jpg'), require('../../../assets/images/bg4.jpg')]

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
      const savedTabs = await tabManager.loadTabs();
      if (savedTabs) {
        setTabs(JSON.parse(savedTabs)); // Parse as JSON
      }
    };

    loadTabs
    handleBg()
  }, [])



  if (!bg) {
    return null
  }

  const isValidUrl = (url: string) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' +
      '((([a-z0-9\\-]+)\\.)+[a-z]{2,}|localhost|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z0-9@:%_\\+.~#?&//=]*)?$',
      'i'
    );
    return pattern.test(url);
  };

  const toggleSwitch = () => {
    setPrivateSearch(previousState => !previousState);
  }

  const handleSearch = async () => {
    if (isValidUrl(query)) {
      const newTabs = [...tabs, query];
      setTabs(newTabs);

      await tabManager.saveTabs(newTabs);

      router.push({ pathname: './webview', params: { url: query } });
    } else {
      const googleSearchUrl = `google.com/search?q=${query}`;

      const newTabs = [...tabs, googleSearchUrl];
      setTabs(newTabs);

      await tabManager.saveTabs(newTabs);

      router.push({ pathname: './webview', params: { url: googleSearchUrl } });
    }
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

      <StatusBar style='light' translucent={true} />
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
