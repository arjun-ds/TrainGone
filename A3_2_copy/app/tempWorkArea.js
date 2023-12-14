import { useState } from "react";
import * as React from "react";
import { useRouter } from "expo-router";
import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { Themes } from "../assets/Themes";

// import { router, Link } from "expo-router";
import "expo-router/entry";
import { Stack } from "expo-router/stack";
import { Link, Tabs } from "expo-router";

import videoInfiniteScroll from "./feed/videoInfiniteScroll";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Feather } from "@expo/vector-icons";
import CategoryList from "../assets/Images/Components/categoryList";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "expo-router/src/global-state/router-store";

export default function Page() {
  const navigation = useRouter();
  const [token, setToken] = useState(1);
  const [searchText, setSearchText] = useState("");

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify({
        Word: "",
        Definition: "",
        nounAV: "",
        categories: "",
        handshape: "",
        palmOrientation: "",
        bodyLocation: "",
        palmMovement: "",
      });
      console.log("JSONVAL: " + JSON.parse(jsonValue).x);
      await AsyncStorage.setItem("my-key", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("my-key");
      console.log("READ JSONVAL: " + JSON.parse(jsonValue).x);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  let contentDisplayed = (
    <ScrollView>
      <Tabs.Screen options={{ tabBarStyle: { display: "flex" } }} />
      <Pressable
        onPress={() => {
          console.log("Store: ");
          storeData();
        }}
      >
        <Text style={{ marginTop: 250, marginLeft: 50 }}>Store</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          console.log("Read: ");
          console.log("READING: " + getData());
        }}
      >
        <Text style={{ marginTop: 250, marginLeft: 250 }}>Read</Text>
      </Pressable>
      <View style={styles.home_container}></View>
    </ScrollView>
  );
  return contentDisplayed;
}

const styles = StyleSheet.create({
  video: { flex: 1 },
  // backgroundVideo: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   bottom: 0,
  //   right: 0,
  // },
  home_container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 70, // Adjusted top padding for better alignment
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginHorizontal: 30,
    marginBottom: 10, // Added marginBottom for spacing
    backgroundColor: Themes.colors.extraLightGrey,
    borderRadius: 50,
    paddingHorizontal: 10,
  },

  searchBar: {
    flex: 1,
    color: Themes.colors.blue,
    fontSize: 20,
  },
  searchIcon: {
    marginRight: 10,
    color: Themes.colors.grey,
  },

  sign_search_container: {
    backgroundColor: Themes.colors.figmaPurple,
    paddingHorizontal: 45,
    paddingVertical: 25,
    marginBottom: 15,
    borderRadius: 10,
    marginTop: 10, // Adjusted marginTop for spacing
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: -1, height: 3 },
  },

  category_container: {
    marginVertical: 10,
    // paddingHorizontal: 25,
  },

  category_txt: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },

  popular_container: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 10,
  },

  videos_container: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
  },

  video_individual: {
    flex: 1,
    // flexDirection: "row",
    backgroundColor: Themes.colors.lightGrey,
    height: 200,
    marginTop: 10,
    marginHorizontal: 1,
    borderRadius: 10,
  },

  sign_search_txt: {
    color: Themes.colors.white,
    fontWeight: "bold",
    fontSize: 30,
  },

  login_txt_container: {
    top: "20%",
  },
  login_txt: {
    color: Themes.colors.trainGoneBlue,
    fontSize: 55,
    fontWeight: "bold",
    fontStyle: "italic",
  },

  login_pressable: {
    backgroundColor: "pink",
    alignItems: "center",
    width: 250,
    top: "75%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
    padding: 10,
  },

  pressable_txt: {
    fontWeight: "bold",
    color: Themes.colors.black,
    fontSize: 25,
  },

  login_screen: {},

  container: {
    backgroundColor: Themes.colors.background,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
    backgroundColor: Themes.colors.background,
    paddingBottom: 10,
  },
  header_txt: {
    color: Themes.colors.white,
    fontWeight: "bold",
    fontSize: 20,
  },
  auth_button: {
    backgroundColor: Themes.colors.spotify,
    borderRadius: 24,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  auth_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 10,
  },
  spotify_logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    borderRadius: 30 / 2,
    borderWidth: 1,
    borderColor: Themes.colors.black,
  },
  auth_text: {
    color: Themes.colors.white,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: Themes.colors.trainGoneBlue,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  image_containter: {
    backgroundColor: Themes.colors.spotify,
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
});
