import { useState } from "react";
import * as React from "react";

import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TextInput,
} from "react-native";
import { Themes } from "../../assets/Themes";

// import { router, Link } from "expo-router";
// import "expo-router/entry";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function searchBySign() {
  return (
    <View style={styles.home_container}>
      <View style={styles.popular_container}>
        <Text style={styles.category_txt}>Popular Now</Text>
        <View style={styles.videos_container}>
          <View style={styles.video_individual}></View>
          <View style={styles.video_individual}></View>
          <View style={styles.video_individual}></View>
        </View>
      </View>
      <View style={styles.popular_container}>
        <Text style={styles.category_txt}>Recently Watched</Text>
        <View style={styles.videos_container}>
          <View style={styles.video_individual}></View>
          <View style={styles.video_individual}></View>
          <View style={styles.video_individual}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  home_container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 70, // Adjusted top padding for better alignment
  },

  category_txt: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },

  videos_container: {
    flexDirection: "row",
    width: "100%",
  },

  video_individual: {
    flex: 1,
    // flexDirection: "row",
    backgroundColor: Themes.colors.lightGrey,
    height: 140,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});
