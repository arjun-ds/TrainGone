import {
  FlatList,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { colors } from "../assets/Themes/colors";
import { millisToMinutesAndSeconds } from "../utils";
import { Stack } from "expo-router/stack";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { Video, ResizeMode } from "expo-av";
import { Themes } from "../assets/Themes";
import * as React from "react";
import VideoView from "./VideoView";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { useState } from "react";

export default function videoInfiniteScroll({}) {
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
            source={require("../background.mp4")}
            useNativeControls
            // resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          />
          <Video
            ref={video}
            style={{ aspectRatio: videoRatio }} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            resizeMode="contain"
            source={require("../background2.mp4")}
            useNativeControls
            // resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          />
          <Video
            ref={video}
            style={{ aspectRatio: videoRatio }} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            resizeMode="contain"
            source={require("../background3.mp4")}
            useNativeControls
            // resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          />
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
  video: { flex: 1 },
});
