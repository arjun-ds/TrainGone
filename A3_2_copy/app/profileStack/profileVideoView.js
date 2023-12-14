import {
  FlatList,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
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
import { Octicons } from "@expo/vector-icons";

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
  const [handshapeButtonStates, setHandshapeButtonStates] = useState([
    {
      isPressed: false,
      image: require("../../assets/Images/A-3.png"),
      label: "A",
    },
    {
      isPressed: false,
      image: require("../../assets/Images/B-3.png"),
      label: "B",
    },
    {
      isPressed: false,
      image: require("../../assets/Images/C-2.png"),
      label: "C",
    },
    {
      isPressed: false,
      image: require("../../assets/Images/D-2.png"),
      label: "D",
    },
  ]);

  const [handshape2ButtonStates, setHandshape2ButtonStates] = useState([
    {
      isPressed: false,
      image: require("../../assets/Images/S.png"),
      label: "S",
    },
    {
      isPressed: false,
      image: require("../../assets/Images/open-5.png"),
      label: "Open-5",
    },
    {
      isPressed: false,
      image: require("../../assets/Images/6-W.png"),
      label: "6/W",
    },
  ]);

  const [po1ButtonStates, setPO1ButtonStates] = useState([
    {
      isPressed: false,
      image: require("../../assets/Images/palm-out.png"),
      label: "Out",
    },
    {
      isPressed: false,
      image: require("../../assets/Images/palm-in.png"),
      label: "In",
    },
    {
      isPressed: false,
      image: require("../../assets/Images/palm-down.png"),
      label: "Down",
    },
    {
      isPressed: false,
      image: require("../../assets/Images/palm-up.png"),
      label: "Up",
    },
  ]);

  const [po2ButtonStates, setPO2ButtonStates] = useState([
    {
      isPressed: false,
      image: require("../../assets/Images/palm-nondominant.png"),
      label: "Facing\nnon-dominant\nside",
      pos: -85,
    },
    {
      isPressed: false,
      image: require("../../assets/Images/palm-dominant.png"),
      label: "Facing\ndominant\nside",
      pos: -85,
    },
    {
      isPressed: false,
      image: require("../../assets/Images/palms-facing-eachother.png"),
      label: "Facing\neach other",
      pos: -75,
    },
  ]);

  const [nounAVButtonStates, setNounAVButtonStates] = useState([
    {
      isPressed: false,
      label: "Noun",
      // pos: -85,
    },
    {
      isPressed: false,
      label: "Adjective",
      // pos: -85,
    },
    {
      isPressed: false,
      label: "Verb",
      // pos: -75,
    },
  ]);

  const [bodyPosStates, setBodyPosStates] = useState([
    {
      isPressed: false,
      color: null,
      x: 25,
      y: 135,
    },
    {
      isPressed: false,
      color: null,
      x: 70,
      y: 130,
    },
    {
      isPressed: false,
      color: null,
      x: 125,
      y: 121,
    },
    {
      isPressed: false,
      color: null,
      x: 230,
      y: 95,
    },
    {
      isPressed: false,
      color: null,
      x: 270,
      y: 55,
    },
    {
      isPressed: false,
      color: null,
      x: 270,
      y: 125,
    },
    {
      isPressed: false,
      color: null,
      x: 230,
      y: 155,
    },
    {
      isPressed: false,
      color: null,
      x: 235,
      y: 255,
    },
    {
      isPressed: false,
      color: null,
      x: 260,
      y: 210,
    },
  ]);

  const [palmMovementStates, setPalmMovementStates] = useState([
    {
      isPressed: false,
      name: "arrow-right",
      color: "black",
      backgroundColor: colors.extraLightGrey,
    },
    {
      isPressed: false,
      name: "arrow-left",
      color: "black",
      backgroundColor: colors.extraLightGrey,
    },
    {
      isPressed: false,
      name: "arrow-switch",
      color: "black",
      backgroundColor: colors.extraLightGrey,
    },
  ]);

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
      await getASLData();
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

  function aslHelperFunction(buttonStates, setButtonStates, i) {
    const newButtonStates = [...buttonStates];
    newButtonStates[i].isPressed = !newButtonStates[i].isPressed;
    setButtonStates(newButtonStates);
  }

  const getASLData = async () => {
    for (let i = 0; i < videoDetails.handshape.length; i++) {
      if (videoDetails.handshape[i].isPressed) {
        console.log("BUTTON PRESSED");
        aslHelperFunction(handshapeButtonStates, setHandshapeButtonStates, i);
      }
    }
    for (let i = 0; i < videoDetails.handshape2.length; i++) {
      if (videoDetails.handshape2[i].isPressed) {
        aslHelperFunction(handshape2ButtonStates, setHandshape2ButtonStates, i);
      }
    }
    for (let i = 0; i < videoDetails.palmOrientation; i++) {
      if (videoDetails.palmOrientation[i].isPressed) {
        aslHelperFunction(po1ButtonStates, setPO1ButtonStates, i);
      }
    }
    for (let i = 0; i < videoDetails.palmOrientation2.length; i++) {
      if (videoDetails.palmOrientation2[i].isPressed) {
        aslHelperFunction(po2ButtonStates, setPO2ButtonStates, i);
      }
    }
    for (let i = 0; i < videoDetails.bodyLocation.length; i++) {
      if (videoDetails.bodyLocation[i].isPressed) {
        const newBodyPosStates = [...bodyPosStates];
        newBodyPosStates[i].isPressed = !newBodyPosStates[i].isPressed;
        if (newBodyPosStates[i].color) {
          newBodyPosStates[i].color = null;
        } else {
          newBodyPosStates[i].color = colors.blue;
        }
        setBodyPosStates(newBodyPosStates);
      }
    }
    for (let i = 0; i < videoDetails.palmMovement.length; i++) {
      if (videoDetails.palmMovement[i].isPressed) {
        // aslHelperFunction(palmMovementStates, setPalmMovementStates, i);
        const newPalmMovementStates = [...palmMovementStates];
        newPalmMovementStates[i].isPressed =
          !newPalmMovementStates[i].isPressed;

        if (!newPalmMovementStates[i].isPressed) {
          newPalmMovementStates[i].color = "black";
          newPalmMovementStates[i].backgroundColor = colors.extraLightGrey;
        } else {
          newPalmMovementStates[i].color = "white";
          newPalmMovementStates[i].backgroundColor = colors.blue;
        }

        setPalmMovementStates(newPalmMovementStates);
      }
    }
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
            <View style={styles.grouping_container}>
              <Text style={styles.grouping_txt}> Handshape</Text>
              <View style={styles.handshape_container}>
                {handshapeButtonStates.map((button, index) => (
                  <View key={index} style={styles.handshape}>
                    <Image
                      style={styles.handshape_image}
                      source={button.image}
                    />
                    <View
                      style={[
                        styles.captionContainer,
                        button.isPressed
                          ? { backgroundColor: colors.grey }
                          : null,
                      ]}
                    >
                      <Text style={styles.captionText}>{button.label}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View style={[styles.grouping_container, { paddingTop: 0 }]}>
              <View style={[styles.handshape_container, { paddingTop: 0 }]}>
                {handshape2ButtonStates.map((button, index) => (
                  <View key={index} style={styles.handshape}>
                    <Image
                      style={styles.handshape_image}
                      source={button.image}
                    />
                    <View
                      style={[
                        styles.captionContainer,
                        button.isPressed
                          ? { backgroundColor: colors.grey }
                          : null,
                      ]}
                    >
                      <Text style={styles.captionText}>{button.label}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.grouping_container}>
              <Text style={styles.grouping_txt}> Palm Orientation</Text>
              <View style={styles.po_container}>
                {po1ButtonStates.map((button, index) => (
                  <View key={index} style={styles.handshape}>
                    <Image
                      style={styles.handshape_image}
                      source={button.image}
                    />
                    <View
                      style={[
                        styles.captionContainer,
                        button.isPressed
                          ? { backgroundColor: colors.grey }
                          : null,
                      ]}
                    >
                      <Text style={styles.captionText}>{button.label}</Text>
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.po2_container}>
                {po2ButtonStates.map((button, index, image) => (
                  <View key={index} style={styles.handshape}>
                    <Image
                      style={styles.handshape_image}
                      source={button.image}
                    />
                    <View
                      style={[
                        styles.po2_captionContainer,
                        button.isPressed
                          ? { backgroundColor: colors.grey }
                          : null,
                      ]}
                      bottom={button.pos}
                    >
                      <Text style={styles.po2_captionText} numberOfLines={3}>
                        {button.label}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.grouping_container}>
              <Text style={styles.grouping_txt}>Select Body Location</Text>
              <Image
                style={styles.full_body_img}
                source={require("../../assets/Images/body-outline-3.png")}
              />
              <View style={styles.bodyPos_container}>
                {bodyPosStates.map((button, index) => (
                  <View
                    key={index}
                    style={styles.small_circle}
                    backgroundColor={button.color}
                    bottom={button.y}
                    left={button.x}
                  ></View>
                ))}
              </View>
            </View>
            <View style={styles.grouping_container}>
              <Text style={styles.grouping_txt}>Palm Movement</Text>
              <View style={styles.palm_movement_container}>
                {palmMovementStates.map((button, index) => (
                  <View
                    key={index}
                    style={styles.iconBox}
                    backgroundColor={button.backgroundColor}
                  >
                    <Octicons
                      name={button.name}
                      size={64}
                      color={button.color}
                      style={{ transform: [{ rotate: "315deg" }] }}
                    />
                  </View>
                ))}
              </View>
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
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
    zIndex: 2,
    height: Dimensions.get("window").height,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#E9730F",
    marginLeft: 10,
  },
  iconButton: {
    margin: 8,
    backfaceVisibility: false,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
  thumbnailRow: { flexDirection: "row", height: 200 },
  thumbnailPlaceholder: {
    width: 120,
    marginVertical: 15,
    marginLeft: 30,
    // backgroundColor: "black",
    borderRadius: 15,
  },
  nounAVrow: {
    height: 100,
    // backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // flex: 1,
  },
  category_container: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },

  category_txt: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  grouping_container: {
    width: "100%",
    paddingBottom: 75,
    paddingHorizontal: 15,
  },

  grouping_txt: {
    //paddingLeft: 10,
    //marginLeft: 10,
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },

  handshape_container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
  },

  po_container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 35,
  },

  po2_container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 35,
  },

  handshape_image: {
    flex: 1,
    // flexDirection: "row",
    // backgroundColor: Themes.colors.lightGrey,
    height: 140,
    // width: 80,
    //marginTop: 5,
    //marginHorizontal: 5,
    borderRadius: 10,
    //marginLeft: 5,
  },

  handshape: {
    // flex: 1,
    flexDirection: "row",
    // backgroundColor: Themes.colors.orange,
    // height: 140,
    width: 90,
    //marginHorizontal: 5,
    //padding: 0,
    justifyContent: "center",
    alignItems: "flex-end",
    // borderRadius: 10,
  },
  captionContainer: {
    position: "absolute",
    bottom: -27,
    backgroundColor: colors.extraLightGrey,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  po2_captionContainer: {
    //width: "100%",
    position: "absolute",
    backgroundColor: colors.extraLightGrey,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  nounAV_captionContainer: {
    //width: "100%",
    // position: "absolute",
    backgroundColor: colors.extraLightGrey,
    borderRadius: 50,
    width: 100,
    paddingVertical: 15,
  },
  captionText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  po2_captionText: {
    color: colors.black,
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
  nounAV_captionText: {
    color: colors.black,
    // adjustsFontSizeToFit: true,
    fontWeight: "bold",
    textAlign: "center",
  },
  full_body_img: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
    height: 300,
  },
  small_circle: {
    height: 15,
    width: 15,
    borderRadius: "50%",
    borderWidth: 1.5,
    borderColor: "black",
    position: "absolute",
  },
  palm_movement_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 60,
  },

  iconBox: {
    // backgroundColor: colors.extraLightGrey,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    borderRadius: 10,
  },
  search_button: {
    backgroundColor: Themes.colors.blue,
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignSelf: "center",
    width: "80%",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: -1, height: 3 },
  },
  search_button_txt: {
    color: Themes.colors.white,
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  item: {
    flexDirection: "column",
    marginRight: 20,
    alignItems: "center",
  },
  itemText: {
    marginTop: 0,
    fontSize: 16,
  },

  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    marginTop: 0,
    fontSize: 16,
  },
});
