import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"
import { appColors } from "@/src/util/colors";

export default function RootLayout() {
  const iconSize = 24

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: appColors.purple,
      tabBarStyle: { backgroundColor: appColors.dark },
      headerShown: false,
      tabBarHideOnKeyboard: true
    }}>
      <Tabs.Screen name="index" options={{
        title: "Pagina Inicial",
        tabBarIcon: ({ color }) => <Ionicons name="planet-sharp" size={iconSize} color={color} />
      }} />

      <Tabs.Screen name="browserTabs" options={{
        title: "Guias",
        tabBarIcon: ({ color }) => <Ionicons name="copy-sharp" size={iconSize} color={color} />
      }} />

      <Tabs.Screen name="chatAi" options={{
        title: "Assistente IA",
        tabBarIcon: ({ color }) => <Ionicons name="chatbubble-ellipses-sharp" size={iconSize} color={color} />
      }} />

      <Tabs.Screen name="user" options={{
        title: "Conta",
        tabBarIcon: ({ color }) => <Ionicons name="person-circle-sharp" size={iconSize} color={color} />
      }} />
    </Tabs>
  );
}
