{
  /*
This is the layout for the navigation of searching by sign. It begins in the home section of the
tab bar and goes through the navigation pages of looking for words through signs and terminates
in the entry for a word
*/
}

import { Stack } from "expo-router/stack";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "expo-router/src/useNavigation";

export default function Layout() {
  const navigation = useNavigation();
  return (
    <Stack backBehavior="history">
      // first navigation page
      <Stack.Screen
        name="searchBySign"
        options={{
          headerShown: true,
          title: "Search by Sign",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="left"
                size={25}
                color={Themes.colors.black}
                style={{ paddingLeft: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      //Each subsequent stack screen has the same structure //In some of them we
      make the back button display "Back" because the other word was too long
      <Stack.Screen
        name="coffee"
        options={{
          headerShown: true,
          title: "Coffee",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="left"
                size={25}
                color={Themes.colors.black}
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="left"
                size={25}
                color={Themes.colors.black}
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
                color={Themes.colors.black}
                style={{ paddingLeft: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="baseball"
        options={{
          headerShown: true,
          title: "Baseball",
          headerBackTitle: "Back",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="left"
                size={25}
                color={Themes.colors.black}
                style={{ paddingLeft: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="football"
        options={{
          headerShown: true,
          title: "Football",
          headerBackTitle: "Back",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="left"
                size={25}
                color={Themes.colors.black}
                style={{ paddingLeft: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="goodtoseeyou"
        options={{
          headerShown: true,
          title: "Good to see you",
          headerBackTitle: "Back",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="left"
                size={25}
                color={Themes.colors.black}
                style={{ paddingLeft: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="hello"
        options={{
          headerShown: true,
          title: "Hello",
          headerBackTitle: "Back",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="left"
                size={25}
                color={Themes.colors.black}
                style={{ paddingLeft: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="soccer"
        options={{
          headerShown: true,
          title: "Soccer",
          headerBackTitle: "Back",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="left"
                size={25}
                color={Themes.colors.black}
                style={{ paddingLeft: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="whatsup"
        options={{
          headerShown: true,
          title: "What's up",
          headerBackTitle: "Back",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="left"
                size={25}
                color={Themes.colors.black}
                style={{ paddingLeft: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
