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
import { millisToMinutesAndSeconds } from "../../utils";
import { Stack } from "expo-router/stack";
import { Link } from "expo-router";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { Video, ResizeMode } from "expo-av";
import { Themes } from "../../assets/Themes";
import * as React from "react";
import VideoView from "./VideoView";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Greetings() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const router = useRouter();
  const params = useLocalSearchParams();

  // //CHANGE  THIS LINE
  // const videos = [
  //   {
  //     videoName: "background",
  //     file: require("../background.mp4"),
  //   },
  //   {
  //     videoName: "background2",
  //     file: require("../background2.mp4"),
  //   },
  //   {
  //     videoName: "background3",
  //     file: require("../background3.mp4"),
  //   },
  // ];

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
      <Stack.Screen
        options={{
          title: params.pageTitle,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      />
      <View style={styles.container}>
        {/* <FlatList
                  data={videos}
                  renderItem={({ item, index }) => (
                    <VideoView videoName={item.videoName} />
                  )}
                  keyExtractor={(item) => item.id}
                /> */}
        <ScrollView>
          <Video
            ref={video}
            style={{ aspectRatio: videoRatio }} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            resizeMode="contain"
            source={require("../../videos/baseball.mov")}
            useNativeControls
            // resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          />
          <View style={styles.overlay}>
            <View style={styles.description}>
              <Text style={styles.overlayText}>Baseball</Text>
              <View style={styles.link}>
                <Text style={styles.category_txt}>Sports</Text>
              </View>
            </View>
            <Pressable onPress={adjustHeart}>
              <Ionicons name={id} size={30} color="black" />
            </Pressable>
          </View>
          <Video
            ref={video}
            style={{ aspectRatio: videoRatio }} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            resizeMode="contain"
            source={require("../../videos/football.mov")}
            useNativeControls
            // resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          />
          <View style={styles.overlay}>
            <View style={styles.description}>
              <Text style={styles.overlayText}>Football</Text>
              <View style={styles.link}>
                <Text style={styles.category_txt}>Sports</Text>
              </View>
            </View>
            <Pressable onPress={adjustHeart}>
              <Ionicons name={id} size={30} color="black" />
            </Pressable>
          </View>
          <Video
            ref={video}
            style={{ aspectRatio: videoRatio }} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            resizeMode="contain"
            source={require("../../videos/soccer.mov")}
            useNativeControls
            // resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          />
          <View style={styles.overlay}>
            <View style={styles.description}>
              <Text style={styles.overlayText}>Soccer</Text>
              <View style={styles.link}>
                <Text style={styles.category_txt}>Sports</Text>
              </View>
            </View>
            <Pressable onPress={adjustHeart}>
              <Ionicons name={id} size={30} color="black" />
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
    paddingRight: 20,
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
  },

  video: { flex: 1 },
});
