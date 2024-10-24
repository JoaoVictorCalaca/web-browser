import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
import { ActivityIndicator, View, StyleSheet, Dimensions, TouchableOpacity, Share, Alert, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { appColors } from '@/src/util/colors';
import { useEffect, useMemo, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { ProgressBar } from 'react-native-paper';
import UrlNotFound from '@/src/components/UrlNotFound';
import BottomSheetBtn from '@/src/components/BottomSheetBtn';

const webview = () => {
  const { url } = useLocalSearchParams();

  const [query, setQuery] = useState(url)
  const [urlString, setUrlString] = useState('')
  const [key, setKey] = useState(0)
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const webViewRef = useRef<WebView>(null)

  const bottomShetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ["60%"], [])

  useEffect(() => {
    if (url) {
      setQuery(url);
      setUrlString(url as string);
    }
  }, [url]);


  if (!url || typeof url !== 'string') {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleUrl = (text: string) => {
    if (!isValidUrl(text)) {
      const googleSearchUrl = `https://google.com/search?q=${text}`;
      setUrlString(googleSearchUrl);
    } else {
      setUrlString(text);
    }
    setQuery(text);
    setKey((prevKey) => prevKey + 1)
  };

  const goHomePage = () => {
    router.push('/')
    setQuery(url)
    setUrlString(url)
  };

  const goPreviousPage = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
    }
  }

  const goNextPage = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goForward();
    }
  }

  const refreshPage = () => {
    setKey(prevKey => prevKey + 1)
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

  const closeOptions = () => {
    bottomShetRef.current?.close()
  }

  const openOptions = () => {
    bottomShetRef.current?.expand()
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      {hasError ? (
        <UrlNotFound url={urlString} setHasError={setHasError} setUrl={setUrlString} />
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => { goHomePage() }}>
              <Ionicons color={appColors.purple} size={28} name="home-sharp" />
            </TouchableOpacity>

            <View style={styles.inputSearchedContainer}>
              <TextInput
                value={typeof query === 'string' ? query : ''}
                onChangeText={setQuery}
                keyboardType="url"
                key={key}
                style={styles.searchedInput}
                returnKeyType="search"
                placeholder="Pesquisar"
                placeholderTextColor={'#ccc'}
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={() => handleUrl(query as string)} />
            </View>

            <TouchableOpacity onPress={() => { goPreviousPage() }}>
              <Ionicons color={appColors.purple} size={28} name="arrow-back-circle" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { goNextPage() }}>
              <Ionicons color={appColors.purple} size={28} name="arrow-forward-circle" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { openOptions() }}>
              <Ionicons color={appColors.purple} size={28} name="ellipsis-horizontal-sharp" />
            </TouchableOpacity>
          </View>

          {progress < 1 && (
            <ProgressBar progress={progress} color={appColors.purple} style={styles.progressBar} />
          )}

          <WebView
            ref={webViewRef}
            source={{ uri: urlString as string }}
            style={styles.webview}
            key={key}
            startInLoadingState={true}
            onLoadProgress={({ nativeEvent }) => {
              setProgress(nativeEvent.progress);
            }}
            onHttpError={() => { setHasError(true); }}
            onError={() => { setHasError(true); }}
            onNavigationStateChange={(navState) => {
              setCanGoBack(navState.canGoBack);
              setCanGoForward(navState.canGoForward);
            }}
          />
        </>
      )}

      <BottomSheet
        ref={bottomShetRef}
        index={-1}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: appColors.dark }}
        enablePanDownToClose={true}
      >
        <View style={styles.bottomSheetContainer}>
          <View style={{ gap: 10 }}>
            <BottomSheetBtn onPress={refreshPage} url={url} label={'Recarregar página'} icon={'refresh-outline'} />
            <BottomSheetBtn onPress={shareUrl} url={url} label={'Copiar link'} icon={'clipboard-outline'} />
            <BottomSheetBtn onPress={shareUrl} url={url} label={'Salvar como favorito'} icon={'bookmark-outline'} />
            <BottomSheetBtn onPress={shareUrl} url={url} label={'Compartilhar'} icon={'share-social-outline'} />
          </View>

          <TouchableOpacity onPress={closeOptions} style={[styles.btnSearchOnWeb, { backgroundColor: appColors.gray, justifyContent: 'center' }]}>
            <Text style={styles.defaultText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      <StatusBar style='light' />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },

  webview: {
    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height,
  },

  defaultText: {
    fontSize: 20,
    color: '#fff'
  },

  progressBar: {
    height: 4,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: appColors.dark,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    paddingTop: Constants.statusBarHeight + 5
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

  searchedInput: {
    color: '#fff',
    fontSize: 20,
    width: '100%'
  },

  bottomSheetContainer: {
    gap: 10,
    padding: 10,
    justifyContent: 'space-between',
    flex: 1
  },

  btnSearchOnWeb: {
    backgroundColor: appColors.purple,
    borderRadius: 100,
    flexDirection: 'row',
    gap: 8,
    padding: 12
  },
});

export default webview;
