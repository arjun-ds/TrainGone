import { Stack } from "expo-router/stack";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
// import { useNavigation } from "expo-router";
import { Navigation } from "react-native-navigation";
import { useNavigation } from "expo-router/src/useNavigation";
// import { StackActions } from "@react-navigation/native";

export default function Layout() {
  const navigation = useNavigation();
  return (
    <Stack backBehavior="history">
      <Stack.Screen
        name="searchBySign"
        options={{
          headerShown: true,
          title: "Search by Sign",
          // headerBackTitle: "Back",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
      {/* <Stack.Screen
        name="searchResults" //comment this screen out?
        options={{
          headerShown: true,
          title: "Search Results",
          headerBackTitle: "Back",
        }}
      /> */}
      <Stack.Screen
        name="coffee"
        options={{
          headerShown: true,
          title: "Coffee",
          // headerBackTitle: "Back",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
      <Stack.Screen
        name="milk"
        options={{
          headerShown: true,
          title: "Milk",
          // headerBackTitle: "Back",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
      <Stack.Screen
        name="water"
        options={{
          headerShown: true,
          title: "Water",
          headerBackTitle: "Back",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
