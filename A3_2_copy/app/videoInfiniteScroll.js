import { Button, StyleSheet, Text, View, Image, Pressable } from "react-native";
import { colors } from "../assets/Themes/colors";
import { millisToMinutesAndSeconds } from "../utils";
import { Stack } from "expo-router/stack";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { Video, ResizeMode } from "expo-av";
import { Themes } from "../assets/Themes";
import * as React from "react";

export default function videoInfiniteScroll({}) {
  const router = useRouter();
  const params = useLocalSearchParams();

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

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
        <Video
          ref={video}
          style={styles.video}
          source={require("../background.mp4")}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
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
