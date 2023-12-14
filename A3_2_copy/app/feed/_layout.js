{
  /*
This is the layout page for the navigation of the "feed" tab. It starts with the main feed
and will navigate to a more specific feed if users press the blue button for any one of the
videos.
*/
}

import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
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
      <Stack.Screen
        name="videoInfiniteScroll"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
