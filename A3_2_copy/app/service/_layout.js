import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="searchBySign"
        options={{
          headerShown: true,
          title: "Search by Sign",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="searchResults"
        options={{
          headerShown: true,
          title: "Search Results",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="coffee"
        options={{
          headerShown: true,
          title: "Coffee",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="milk"
        options={{
          headerShown: true,
          title: "Milk",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="water"
        options={{
          headerShown: true,
          title: "Water",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
