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

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function profileVideoView() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const [videoDetailsReady, setVideoDetailsReady] = useState(false);
  const [videoDetails, setVideoDetails] = useState({
    Word: "",
    Definition: "",
    nounAV: [{ isPressed: false }, { isPressed: false }, { isPressed: false }],
    categories: {
      Movies: false,
      Adventure: false,
      Sports: false,
      Weather: false,
      Food: false,
      Drinks: false,
      Greetings: false,
    },
    handshape: [
      { isPressed: false },
      { isPressed: false },
      { isPressed: false },
      { isPressed: false },
    ],
    handshape2: [
      { isPressed: false },
      { isPressed: false },
      { isPressed: false },
    ],
    palmOrientation: [
      { isPressed: false },
      { isPressed: false },
      { isPressed: false },
      { isPressed: false },
    ],
    palmOrientation2: [
      { isPressed: false },
      { isPressed: false },
      { isPressed: false },
    ],
    bodyLocation: [
      { isPressed: false },
      { isPressed: false },
      { isPressed: false },
      { isPressed: false },
      { isPressed: false },
      { isPressed: false },
      { isPressed: false },
      { isPressed: false },
      { isPressed: false },
    ],
    palmMovement: [
      { isPressed: false },
      { isPressed: false },
      { isPressed: false },
    ],
  });

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
  const updateVideoRatioOnDisplay = async (videoDetails) => {
    const { width, height } = videoDetails.naturalSize;
    const newVideoRatio = width / height;
    setVideoRatio(newVideoRatio); //END CODE FROM https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist

    try {
      const jsonValue = await AsyncStorage.getItem(params.id);
      // console.log("READ JSONVAL: " + JSON.parse(jsonValue).nounAV[0].isPressed);
      // console.log("READ JSONVAL: " + JSON.parse(jsonValue).nounAV[1].isPressed);
      setVideoDetails(jsonValue != null ? JSON.parse(jsonValue) : null);
      setVideoDetailsReady(true);

      await getCategories();
      await getNounAV();
    } catch (e) {
      // error reading value
    }
  };

  const [categoryList, setCategoryList] = useState([]);
  const getCategories = async () => {
    let categoryList2 = [];
    catListKeys = Object.keys(videoDetails.categories);
    for (let i = 0; i < catListKeys.length; i++) {
      let keyString = String(catListKeys[i]);
      if (videoDetails.categories[keyString] == true) {
        categoryList2.push(
          <View style={styles.link}>
            <Text style={styles.category_txt}>{keyString}</Text>
          </View>
        );
      }
    }
    setCategoryList(categoryList2);
  };

  const [nounAV, setNounAV] = useState([]);
  const getNounAV = async () => {
    let nounAV2 = [];
    for (let i = 0; i < videoDetails.nounAV.length; i++) {
      if (videoDetails.nounAV[i].isPressed == true) {
        let word = "";
        if (i == 0) word = "noun";
        else if (i == 1) word = "adjective";
        else word = "verb";
        nounAV2.push(
          <Text style={{ paddingVertical: 10, paddingRight: 10 }}>{word}</Text>
        );
      }
    }
    setNounAV(nounAV2);
  };

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

  console.log("PROFILEVIDEOVIEW: ID: " + params.id);

  return (
    <>
      {!videoDetailsReady ? (
        <>
          <Stack.Screen options={{ title: "Water" }} />
          <ScrollView>
            <Video
              style={styles.videos} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
              resizeMode="cover"
              source={require("../../videos/water.mov")}
              // source={{ uri: params.uri }}
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
                The substance (most commonly encountered as a liquid) which is
                the principal constituent of seas, lakes, and rivers, and which
                falls as rain and other forms of precipitation.
              </Text>
            </View>
          </ScrollView>
        </>
      ) : (
        <>
          <Stack.Screen options={{ title: videoDetails.Word }} />
          <ScrollView>
            <Video
              style={styles.videos} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
              resizeMode="cover"
              source={{ uri: params.uri }}
              useNativeControls
              // resizeMode={ResizeMode.CONTAIN}
              isLooping
              shouldPlay="false"
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            />

            <View style={styles.overlay}>
              <View style={styles.description}>
                <Text style={styles.overlayText}>{videoDetails.Word}</Text>
                {categoryList}
              </View>
              <Pressable onPress={adjustHeart}>
                <Ionicons name={id} size={30} color="red" />
              </Pressable>
            </View>
            <View style={styles.definition_container}>
              <Text style={styles.definition_header}>DEFINITION</Text>
              <View style={([styles.part_speech], { flexDirection: "row" })}>
                {nounAV}
              </View>
              <Text style={styles.definition_txt}>
                {videoDetails.Definition}
              </Text>
            </View>
          </ScrollView>
        </>
      )}
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
    marginRight: 5,
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
