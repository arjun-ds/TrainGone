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
} from "react-native";
import { Themes } from "../assets/Themes";
// import { router, Link } from "expo-router";
import "expo-router/entry";
import { Stack } from "expo-router/stack";
import { Link } from "expo-router";

export default function Page() {
  const [token, setToken] = useState(null);

  let contentDisplayed = null;
  if (token) {
    contentDisplayed = (
      <ImageBackground
        source={require("../assets/login_image.png")}
        resizeMode="cover"
        style={styles.login_image}
      >
        <View style={styles.login_txt_container}>
          <Text style={styles.login_txt}>TrainGone</Text>
        </View>
        <Link
          asChild
          href={{
            pathname: "/videoInfiniteScroll",
            params: {},
          }}
        >
          <Pressable style={styles.login_pressable} onPress={() => setToken(1)}>
            <Text style={styles.pressable_txt}>GO TO TASK 2</Text>
          </Pressable>
        </Link>
      </ImageBackground>
    );
  } else {
    contentDisplayed = (
      <ImageBackground
        source={require("../assets/trainGone_logo.png")}
        resizeMode="cover"
        style={styles.login_image}
      >
        <View style={styles.login_txt_container}>
          <Text style={styles.login_txt}>TrainGone</Text>
        </View>
        <Pressable style={styles.login_pressable} onPress={() => setToken(1)}>
          <Text style={styles.pressable_txt}>GET STARTED</Text>
        </Pressable>
      </ImageBackground>
    );
  }
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
  login_image: {
    flex: 1,
    alignItems: "center",
  },

  login_txt_container: {
    top: "20%",
  },

  login_txt: {
    color: Themes.colors.white,
    fontSize: 55,
    fontWeight: "bold",
    fontStyle: "italic",
  },

  login_pressable: {
    backgroundColor: Themes.colors.white,
    alignItems: "center",
    width: 250,
    top: "75%",
    borderRadius: "20%",
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
    backgroundColor: "#f9c2ff",
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
});
