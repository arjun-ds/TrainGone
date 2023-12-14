import { Stack } from "expo-router/stack";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router/src/useNavigation";

export default function Layout() {
  const navigation = useNavigation();

  return (
    <Stack>
      <Stack.Screen
        name="profile"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profileVideoView"
        options={{
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("profile")}>
              <AntDesign
                name="left"
                size={25}
                color="black"
                style={{ paddingLeft: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
