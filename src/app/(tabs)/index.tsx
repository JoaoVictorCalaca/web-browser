import { appColors } from "@/src/util/colors";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useRef, useState } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity, Switch, ActivityIndicator, Share, Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import WebView from "react-native-webview";
import BottomSheet from "@gorhom/bottom-sheet/";
import BottomSheetBtn from "@/src/components/bottomSheetBtn";

const backgrounds = [require('../../../assets/images/bg1.png'), require('../../../assets/images/bg2.jpg'), require('../../../assets/images/bg3.jpg'), require('../../../assets/images/bg4.jpg')]

export default function Index() {
  const [bg, setBg] = useState(null)
  const [query, setQuery] = useState('')
  const [url, setUrl] = useState('')
  const [key, setKey] = useState(0)
  const [hasError, setHasError] = useState(false);
  const [searched, setSearched] = useState(false)
  const [privateSearch, setPrivateSearch] = useState(false);

  const bottomShetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ["40%"], [])

  useEffect(() => {
    const handleBg = () => {
      const bgId = Math.floor(Math.random() * backgrounds.length)

      setBg(backgrounds[bgId])
    }

    handleBg()
  }, [])

  if (!bg) {
    return null
  }

  const handleUrl = (text: string) => {
    setUrl(text)
    setKey(prevKey => prevKey + 1)
    setSearched(true)
  }

  const goHomePage = () => {
    setSearched(false);
    setQuery('')
    setKey(prevKey => prevKey + 1)
  };

  const refreshPage = () => {
    setUrl(prevUrl => prevUrl)
    setKey(prevKey => prevKey + 1)
  }

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    setHasError(true);

    // Realiza uma busca no Google pelo URL que falhou
    if (url.trim()) {
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      setUrl(googleSearchUrl);
    } else {
      Alert.alert('Erro', 'Nenhuma pesquisa válida foi encontrada.');
    }
  };

  const toggleSwitch = () => {
    setPrivateSearch(previousState => !previousState);
  }

  const closeOptions = () => {
    bottomShetRef.current?.close()
  }

  const openOptions = () => {
    bottomShetRef.current?.expand()
  }

  const shareUrl = async () => {
    try {
      const result = await Share.share({
        message: `https://${encodeURI(url)} \n \nConfira este link compartilhado com o navegador CFC.`,
      })

      if (result.action === Share.sharedAction) {
        console.log('Compartilhamento realizado com sucesso.');
      } else if (result.action === Share.dismissedAction) {
        console.log('Compartilhamento cancelado.');
      }

    } catch (e) {
      Alert.alert(`Houve um erro ao compartilhar}`)
    }
  }

  if (!searched) {
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
              onSubmitEditing={() => handleUrl(query)} />
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
      </ImageBackground>
    );
  } else {
    return (
      <GestureHandlerRootView>
        <View style={styles.navigatinContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => { goHomePage() }}>
              <Ionicons color={appColors.purple} size={28} name="home-sharp" />
            </TouchableOpacity>

            <View style={styles.inputSearchedContainer}>
              <TextInput
                value={query}
                onChangeText={setQuery}
                keyboardType="url"
                style={styles.searchedInput}
                returnKeyType="search"
                placeholder="Pesquisar"
                placeholderTextColor={'#ccc'}
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={() => handleUrl(query)} />
            </View>

            <TouchableOpacity onPress={() => { refreshPage() }}>
              <Ionicons color={appColors.purple} size={28} name="refresh-circle-sharp" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { openOptions() }}>
              <Ionicons color={appColors.purple} size={28} name="ellipsis-horizontal-sharp" />
            </TouchableOpacity>
          </View>

          {hasError ? (
            <View style={styles.container}>
              <TouchableOpacity style={styles.btnSearchOnWeb} onPress={() => setHasError(false)}>
                <Text style={styles.defaultText}>Buscar resultados na web</Text>
                <Ionicons color={'#fff'} size={24} name="search-sharp" />
              </TouchableOpacity>

              {url !== '' && (
                <WebView
                  style={{ flex: 1, width: "100%" }}
                  source={{ uri: url }}
                  startInLoadingState={true}
                  renderLoading={() => <ActivityIndicator size="large" color={appColors.purple} />}
                />
              )}
            </View>
          ) : (
            <WebView
              style={{ flex: 1, width: "100%" }}
              source={{ uri: `https://${encodeURI(url)}` }}
              key={key}
              onError={handleError}
              renderLoading={() => <ActivityIndicator size="large" color={appColors.purple} />}
              startInLoadingState={true}
            />
          )}

          <BottomSheet
            ref={bottomShetRef}
            index={-1}
            snapPoints={snapPoints}
            backgroundStyle={{ backgroundColor: appColors.lightGray }}
            enablePanDownToClose={true}
          >
            <View style={styles.bottomSheetContainer}>
              <BottomSheetBtn onPress={shareUrl} url={url} label={'Copiar link'} icon={'clipboard-outline'} />
              <BottomSheetBtn onPress={shareUrl} url={url} label={'Salvar como favorito'} icon={'bookmark-outline'} />
              <BottomSheetBtn onPress={shareUrl} url={url} label={'Compartilhar'} icon={'share-social-outline'} />

              <TouchableOpacity onPress={closeOptions} style={[styles.btnSearchOnWeb, { backgroundColor: appColors.gray, justifyContent: 'center', position: 'relative', bottom: -20 }]}>
                <Text style={[styles.defaultText]}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 20,
    gap: 20
  },

  defaultText: {
    fontSize: 20,
    color: '#fff'
  },

  navigatinContainer: {
    paddingTop: 30,
    backgroundColor: appColors.dark,
    flex: 1,
  },

  background: {
    flex: 1,
    width: '100%'
  },

  btnSearchOnWeb: {
    backgroundColor: appColors.purple,
    borderRadius: 100,
    flexDirection: 'row',
    gap: 8,
    padding: 12
  },

  inputContainer: {
    flexDirection: 'row',
    borderRadius: 115,
    borderWidth: 4,
    borderColor: appColors.purple,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'rgba(13, 13, 13, 0.7)',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 20
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: appColors.dark,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },

  inputSearchedContainer: {
    flexDirection: 'row',
    borderRadius: 115,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: appColors.gray,
    justifyContent: 'space-around',
    width: '50%'
  },

  search: {
    color: '#fff',
    width: '80%',
    fontSize: 20,
  },

  searchedInput: {
    color: '#fff',
    fontSize: 20,
    width: '100%'
  },

  bottomSheetContainer: {
    gap: 10,
    padding: 10
  }
})
