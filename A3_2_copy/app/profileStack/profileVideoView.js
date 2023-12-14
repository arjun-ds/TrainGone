import {
  FlatList,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { colors } from "../../assets/Themes/colors";
import { Stack } from "expo-router/stack";
import { Link } from "expo-router";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { Video, ResizeMode } from "expo-av";
import { Themes } from "../../assets/Themes";
import * as React from "react";
import VideoView from "../feed/VideoView";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default function profileVideoView() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const router = useRouter();
  const params = useLocalSearchParams();
  let WindowHeight =
    Dimensions.get("window").height -
    useBottomTabBarHeight() -
    getStatusBarHeight();

  //BEGIN CODE FROM https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
  const defaultScreenRatio =
    Dimensions.get("window").width / Dimensions.get("window").height;

  // Use the screenDefaultRatio to render the video before the video is loaded
  const [videoRatio, setVideoRatio] = useState(defaultScreenRatio);

  // Update the videoRatio right after we know the video natural size
  const updateVideoRatioOnDisplay = (videoDetails) => {
    const { width, height } = videoDetails.naturalSize;
    const newVideoRatio = width / height;

    setVideoRatio(newVideoRatio);
  };
  //END CODE FROM https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist

  // const video = React.useRef(null);
  // const [status, setStatus] = React.useState({});
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
      <Stack.Screen options={{ title: "Video Title" }} />
      <ScrollView>
        <Video
          style={styles.videos} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          resizeMode="cover"
          source={require("../../videos/water.mov")}
          useNativeControls
          // resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay="false"
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
        />

        <View style={styles.overlay}>
          <View style={styles.description}>
            <Text style={styles.overlayText}>Water</Text>
            <View style={styles.link}>
              <Link href={{ pathname: "feed/Drinks" }}>
                <Text style={styles.category_txt}>Drinks</Text>
              </Link>
            </View>
          </View>
          <Pressable onPress={adjustHeart}>
            <Ionicons name={id} size={30} color="red" />
          </Pressable>
        </View>
        <View style={styles.definition_container}>
          <Text style={styles.definition_header}>DEFINITION</Text>
          <Text style={styles.part_speech}>noun</Text>
          <Text style={styles.definition_txt}>
            The substance (most commonly encountered as a liquid) which is the
            principal constituent of seas, lakes, and rivers, and which falls as
            rain and other forms of precipitation.
          </Text>
        </View>
      </ScrollView>
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
    height: Dimensions.get("window").height - 140,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  definition_container: {
    flex: 1,
    padding: 15,
  },

  definition_header: {
    fontWeight: "bold",
    fontSize: 15,
  },
  part_speech: {
    padding: 10,
  },
  definition_txt: {
    padding: 10,
  },
});
