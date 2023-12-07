import { Tabs } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      backBehavior="history"
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="feed"
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="flash-sharp" size={size} color={color} />
          ),
          href: "feed/videoInfiniteScroll",
        }}
      />
      <Tabs.Screen
        name="createVideo"
        options={{
          tabBarStyle: { display: "none" },
          unmountOnBlur: true,
          tabBarLabel: "Create Video",
          tabBarIcon: ({ size, color }) => (
            <Feather name="plus-square" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        // component={CameraScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        // Name of the route to hide.
        name="flow/searchBySign"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
    </Tabs>
  );
}
