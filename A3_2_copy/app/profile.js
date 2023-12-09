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
  TouchableOpacity,
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
import { Ionicons } from "@expo/vector-icons";

export default function profile() {
  const [page, setPage] = useState(0);
  const [bgcolor, setBgcolor] = useState("#3498db");
  const [bgcolor2, setBgcolor2] = useState(Themes.colors.lightGrey);

  let contentDisplayed = null;
  if (page == 0) {
    contentDisplayed = (
      <>
        <View style={styles.videos_container}>
          <Image
            style={styles.video_individual}
            source={require("../assets/Images/created-video1.png")}
          />
          <Image
            style={styles.video_individual}
            source={require("../assets/Images/created-video2.png")}
          />
          <Image
            style={styles.video_individual}
            source={require("../assets/Images/created-video3.png")}
          />
        </View>
        <View style={styles.videos_container}>
          <Image
            style={styles.video_individual}
            source={require("../assets/Images/created-video4.png")}
          />
          <Image
            style={styles.video_individual}
            source={require("../assets/Images/created-video5.png")}
          />
          <Image
            style={styles.video_individual}
            source={require("../assets/Images/created-video6.png")}
          />
        </View>
      </>
    );
  } else {
    contentDisplayed = (
      <>
        <View style={styles.videos_container}>
          <Image
            style={styles.video_individual}
            source={require("../assets/Images/liked-video1.png")}
          />
          <Image
            style={styles.video_individual}
            source={require("../assets/Images/liked-video2.png")}
          />
          <Image
            style={styles.video_individual}
            source={require("../assets/Images/liked-video3.png")}
          />
        </View>
      </>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require("../assets/Images/profile-pic.png")}
              style={styles.profileImage}
            />
            <View style={styles.header_info}>
              <Text style={styles.username}>Dria Lee</Text>
              <View style={styles.user_status_container}>
                <View style={styles.experience_container}>
                  <Ionicons
                    name="trophy-sharp"
                    size={24}
                    color={Themes.colors.blue}
                  />
                  <Text style={styles.experience_txt}>ASL Learner</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>6</Text>
              <Text style={styles.statLabel}>Definitions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1.5k</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>200</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.followButton}
              backgroundColor={bgcolor}
              onPress={() => {
                setPage(0);
              }}
            >
              <Text style={styles.followButtonText}>Definitions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.followButton}
              backgroundColor={bgcolor2}
              onPress={() => {
                setPage(1);
              }}
            >
              <Text style={styles.followButtonText}>Dictionary</Text>
            </TouchableOpacity>
          </View>
          {contentDisplayed}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#888",
  },
  followButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  followButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  header_info: {
    paddingLeft: 15,
    gap: 10,
  },
  user_status_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  experience_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  experience_txt: {
    color: Themes.colors.blue,
    fontWeight: "bold",
  },
  following_container: {
    backgroundColor: Themes.colors.figmaPurple,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: "10%",
  },
  following: {
    fontWeight: "bold",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 30,
  },
  videos_container: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 0,
  },

  video_individual: {
    flex: 1,
    // flexDirection: "row",
    backgroundColor: Themes.colors.lightGrey,
    height: 175,
    //width: 208,

    marginTop: 10,
    //marginHorizontal: 10,
    borderRadius: 10,
  },
});
