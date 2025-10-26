import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{ title: "Home", tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="products"
        options={{ title: "Products", tabBarIcon: ({ color, size }) => <Ionicons name="pricetags" color={color} size={size} /> }}
      />
    </Tabs>
  );
}
