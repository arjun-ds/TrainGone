import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="searchBySign"
        options={{ headerShown: true, title: "Search by Sign" }}
      />
    </Stack>
  );
}