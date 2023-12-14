import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="profile"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="profileVideoView"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
