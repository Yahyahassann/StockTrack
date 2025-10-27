import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="product/create"  />
      <Stack.Screen name="product/[id]"  />
    </Stack>
  );
}
