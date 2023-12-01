import { Button, StyleSheet, Text, View, Image, Pressable } from "react-native";
// import { colors } from "./assets/Themes/colors";
import { Link } from "expo-router";
import { Video, ResizeMode } from "expo-av";
import * as React from "react";
import { Dimensions } from "react-native";
import { useState } from "react";

export default function WebView({ videoName, file }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  console.log(videoName);

  const videos = [
    {
      background: require("../background.mp4"),
      background2: require("../background2.mp4"),
      background3: require("../background3.mp4"),
    },
  ];

  console.log("test: " + videos.background);
  // const videoData = [
  //   { id: 1, videoID: "background" },
  //   { id: 2, videoID: "background2" },
  //   { id: 3, videoID: "background3" },
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
  return (
    <View style={styles.song}>
      <Video
        ref={video}
        style={{ aspectRatio: videoRatio }} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
        resizeMode="contain"
        source={{ uri: file }}
        useNativeControls
        // resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  video: { flex: 1 },
  buttons: {},
});
