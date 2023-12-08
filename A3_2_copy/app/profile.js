import { useState } from "react";
import * as React from "react";

import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { Themes } from "../assets/Themes";
// import { router, Link } from "expo-router";
import "expo-router/entry";
import { Stack } from "expo-router/stack";
import { Link } from "expo-router";

import videoInfiniteScroll from "./feed/videoInfiniteScroll";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function profile() {
  const [page, setPage] = useState(0);

  const changePage = () => {
    page == 1 ? setPage(0) : setPage(1);
  };

  let contentDisplayed = null;
  // if (page == 0) {
  //   contentDisplayed = (

  //   );
  // } else {
  //   contentDisplayed = (

  //   )
  // }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header_container}>
          <View style={styles.header_info}></View>
          <View style={styles.header_data}></View>
        </View>
        <View style={styles.activity_container}></View>
        <View style={styles.videos_container}></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  header_container: {
    flex: 1,
    flexDirection: "column",
  },
  header_info: {},
});
