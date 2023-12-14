import { StyleSheet, Text, View, Pressable } from "react-native";
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
  const [id, setId] = useState("ios-heart-outline");

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

  // when the heart button is clicked, it fills up or becomes an outline
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
          <Video
            ref={video}
            style={styles.videos} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            resizeMode="cover"
            source={require("../../videos/milk.mov")}
            useNativeControls
            // resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay="false"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          />
          <View style={styles.overlay}>
            <View style={styles.description}>
              <Text style={styles.overlayText}>Milk</Text>
              <View style={styles.link}>
                <Text style={styles.category_txt}>Drinks</Text>
              </View>
            </View>
            <Pressable onPress={adjustHeart}>
              <Ionicons name={id} size={30} color="red" />
            </Pressable>
          </View>
          <Video
            ref={video}
            style={styles.videos} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            resizeMode="cover"
            source={require("../../videos/water.mov")}
            useNativeControls
            isLooping
            shouldPlay="false"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          />
          <View style={styles.overlay}>
            <View style={styles.description}>
              <Text style={styles.overlayText}>Water</Text>
              <View style={styles.link}>
                <Text style={styles.category_txt}>Drinks</Text>
              </View>
            </View>
            <Pressable onPress={adjustHeart}>
              <Ionicons name={id} size={30} color="red" />
            </Pressable>
          </View>
          <Video
            ref={video}
            style={styles.videos} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            resizeMode="cover"
            source={require("../../videos/coffee.mov")}
            useNativeControls
            isLooping
            shouldPlay="false"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          />
          <View style={styles.overlay}>
            <View style={styles.description}>
              <Text style={styles.overlayText}>Coffee</Text>
              <View style={styles.link}>
                <Text style={styles.category_txt}>Drinks</Text>
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
    flex: 1,
    backgroundColor: Themes.colors.background,
  },

  videos: {
    height: Dimensions.get("window").height - 230,
    justifyContent: "center",
    alignItems: "center",
    color: Themes.colors.white,
  },

  overlay: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    bottom: 0,
    paddingHorizontal: 15,
    paddingTop: 5,
    backgroundColor: Themes.colors.white,
  },

  description: {
    flexDirection: "row",
    alignItems: "center",
  },

  overlayText: {
    paddingRight: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: Themes.colors.black,
  },

  link: {
    backgroundColor: Themes.colors.black,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: "50%",
    backgroundColor: Themes.colors.blue,
  },

  category_txt: {
    fontSize: 20,
    color: "white",
  },

  video: { flex: 1 },
});
