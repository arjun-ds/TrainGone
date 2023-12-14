import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { colors } from "../../assets/Themes/colors";
import { Stack } from "expo-router/stack";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Video } from "expo-av";
import { Themes } from "../../assets/Themes";
import * as React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default function Greetings() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const router = useRouter();
  const params = useLocalSearchParams();
  let WindowHeight =
    Dimensions.get("window").height -
    useBottomTabBarHeight() -
    getStatusBarHeight();

  // State variables for heart/like icon
  const [id, setId] = useState("ios-heart-outline");
  const adjustHeart = () => {
    if (id == "ios-heart-outline") {
      setId("ios-heart");
    } else {
      setId("ios-heart-outline");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: params.pageTitle,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      />
      <View style={styles.container}>
        <ScrollView
          disableIntervalMomentum={true}
          snapToInterval={WindowHeight}
          decelerationRate={0.9}
        >
          <Video // All video components based on code from // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            ref={video}
            style={styles.videos}
            resizeMode="cover"
            source={require("../../videos/milk.mov")}
            useNativeControls
            isLooping
            shouldPlay="false"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={() => null}
          />
          <View style={styles.overlay}>
            <View style={styles.description}>
              <Text style={styles.overlayText}>Hello</Text>
              <View style={styles.link}>
                <Text style={styles.category_txt}>Greetings</Text>
              </View>
            </View>
            <Pressable onPress={adjustHeart}>
              <Ionicons name={id} size={30} color="red" />
            </Pressable>
          </View>
          <Video
            ref={video}
            style={styles.videos}
            resizeMode="cover"
            source={require("../../videos/goodtoseeyou.mov")}
            useNativeControls
            isLooping
            shouldPlay="false"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={() => null}
          />
          <View style={styles.overlay}>
            <View style={styles.description}>
              <Text style={styles.overlayText}>Good To See You</Text>
              <View style={styles.link}>
                <Text style={styles.category_txt}>Greetings</Text>
              </View>
            </View>
            <Pressable onPress={adjustHeart}>
              <Ionicons name={id} size={30} color="red" />
            </Pressable>
          </View>
          <Video
            ref={video}
            style={styles.videos}
            resizeMode="cover"
            source={require("../../videos/whatsup.mov")}
            useNativeControls
            isLooping
            shouldPlay="false"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={() => null}
          />
          <View style={styles.overlay}>
            <View style={styles.description}>
              <Text style={styles.overlayText}>What's Up?</Text>
              <View style={styles.link}>
                <Text style={styles.category_txt}>Greetings</Text>
              </View>
            </View>
            <Pressable onPress={adjustHeart}>
              <Ionicons name={id} size={30} color="red" />
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    flex: 1,
  },

  description: {
    flexDirection: "row",
    alignItems: "center",
  },

  overlay: {
    backgroundColor: "#FFFFFF",
    height: 60,
    flexDirection: "row",
    bottom: 0,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 5,
    alignItems: "center",
    backgroundColor: "white",
  },
  overlayText: {
    color: "black",
    fontSize: 20,
    paddingRight: 10,
    fontWeight: "bold",
  },

  category_txt: {
    fontSize: 20,
    color: "white",
  },

  link: {
    backgroundColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: "50%",
    backgroundColor: Themes.colors.blue,
  },

  videos: {
    height: Dimensions.get("window").height - 230,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
});
