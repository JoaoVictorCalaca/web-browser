import AsyncStorage from '@react-native-async-storage/async-storage';

export const tabManager = {
  clearTabs: async () => {
    await AsyncStorage.clear()
  },

  async saveTabs(tabs) {
    try {
      const stringifiedTabs = JSON.stringify({ tabs: tabs });
      console.log('Salvando tabs:', stringifiedTabs)
      await AsyncStorage.setItem('tabs', stringifiedTabs);
    } catch (error) {
      console.error('Erro ao salvar tabs:', error);
    }
  },


  async loadTabs() {
    try {
      const tabsString = await AsyncStorage.getItem('tabs');
      console.log('Conteúdo carregado do AsyncStorage:', tabsString);
      return tabsString !== null ? JSON.parse(tabsString) : { tabs: [] }
    } catch (error) {
      console.error('Erro ao carregar tabs:', error);
      return { tabs: [] };
    }
  }
};
