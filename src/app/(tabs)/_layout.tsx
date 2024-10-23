import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"
import { appColors } from "@/src/util/colors";
import { useRoute } from "@react-navigation/native";

export default function RootLayout() {
  const route = useRoute()
  const iconSize = 24

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: appColors.purple,
      tabBarStyle: {
        backgroundColor: appColors.dark,
        borderTopWidth: 0,
        elevation: 0
      },
      headerShown: false,
      tabBarHideOnKeyboard: true,
    }}>
      <Tabs.Screen name="index" options={{
        title: "Pagina Inicial",
        tabBarIcon: ({ color, focused }) => (
          <Ionicons
            name={focused ? "home" : "home-outline"}
            size={iconSize}
            color={color}
          />
        )
      }} />

      <Tabs.Screen name="browserTabs" options={{
        title: "Guias",
        tabBarIcon: ({ color, focused }) => (
          <Ionicons
            name={focused ? "albums" : "albums-outline"}
            size={iconSize}
            color={color}
          />
        )
      }} />

      <Tabs.Screen name="chatAi" options={{
        title: "Assistente IA",
        tabBarIcon: ({ color, focused }) => (
          <Ionicons 
            name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
            size={iconSize} 
            color={color} 
          />
        )
      }} />

      <Tabs.Screen name="user" options={{
        title: "Conta",
        tabBarIcon: ({ color, focused }) => (
          <Ionicons
            name={focused ? "person-circle" : "person-circle-outline"}
            size={iconSize}
            color={color}
          />
        )
      }} />

      <Tabs.Screen name="webview" options={{
        title: "Navigation",
        tabBarButton: () => null,
      }} />
    </Tabs>
  );
}
