import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="product/create" options={{ headerShown: true, title: "Add Product" }} />
      <Stack.Screen name="product/[id]" options={{ headerShown: true, title: "Edit Product" }} />
    </Stack>
  );
}
