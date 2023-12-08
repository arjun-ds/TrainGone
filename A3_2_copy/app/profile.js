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
  TouchableOpacity,
} from "react-native";
import { Themes } from "../assets/Themes";
// import { router, Link } from "expo-router";
import "expo-router/entry";
import { Stack } from "expo-router/stack";
import { Link, Tabs } from "expo-router";

import videoInfiniteScroll from "./feed/videoInfiniteScroll";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function profile() {
  const [page, setPage] = useState(0);
  const navigation = useNavigation();

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
      <Tabs.Screen
        options={{
          headerShown: true,
          title: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="left"
                size={35}
                color="black"
                style={{ paddingLeft: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <View style={styles.header_container}>
          <View style={styles.profilePlaceholder}>
            <Ionicons name="person-circle" size={125} color="grey" />
          </View>
          <View style={styles.header_info_container}>
            <View style={styles.header_name}>
              <Text>Patrick Star</Text>
            </View>
            <View style={styles.header_data_container}>
              <View style={styles.header_badge_view}>
                <Text style={{ color: "blue" }}>New to ASL</Text>
              </View>
              <View style={styles.edit_profile_button_view}>
                <TouchableOpacity>
                  <Text>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
    // justifyContent: "center",
    // alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  header_container: {
    flex: 1,
    flexDirection: "row",
    height: 200,
  },
  header_info: {},
  profilePlaceholder: {
    width: 120,
    // marginVertical: 15,
    marginLeft: 30,
    // backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 15,
  },
  header_info_container: {
    // height: "100%",
    width: "100%",
    // backgroundColor: "green",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    // flex: 1,
  },
  header_data_container: {
    height: 35,
    width: "100%",
    // backgroundColor: "green",
    flexDirection: "row",
    paddingTop: 15,
    // justifyContent: "center",
    // alignItems: "flex-start",
  },
  header_badge_view: {},
  edit_profile_button_view: { paddingLeft: 25 },
});
