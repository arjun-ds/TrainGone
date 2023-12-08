import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ headerShown: true }} /> */}
      <Stack.Screen
        name="Drinks"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Greetings"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Sports"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen name="VideoView" options={{ headerShown: true }} />

      <Stack.Screen
        name="videoInfiniteScroll"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
