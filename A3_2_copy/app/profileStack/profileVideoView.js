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

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Octicons } from "@expo/vector-icons";

//Displays user-created dictionary entries
export default function profileVideoView() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const [videoDetailsReady, setVideoDetailsReady] = useState(false);

  //video data state variable
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

  //Begin "Button" States (Used to determine which ASL/sign "buttons" are selected for the given video)
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
  //END Button States

  let WindowHeight =
    Dimensions.get("window").height -
    useBottomTabBarHeight() -
    getStatusBarHeight();

  //BEGIN CODE FROM https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
  //Code helps resize video upon load
  const defaultScreenRatio =
    Dimensions.get("window").width / Dimensions.get("window").height;

  // Use the screenDefaultRatio to render the video before the video is loaded
  const [videoRatio, setVideoRatio] = useState(defaultScreenRatio);

  //Retrieve video-related data from Async Storage using the given video's ID
  const loadVideo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(params.id);
      setVideoDetails(jsonValue != null ? JSON.parse(jsonValue) : null);
      setVideoDetailsReady(true);
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  //Visually update page to reflect video-related data (e.g. categories)
  const loadVideoDetails = async () => {
    try {
      await getCategories();
      await getNounAV();
      await getASLData();
    } catch (e) {
      console.log(e);
    }
  };

  const [categoryList, setCategoryList] = useState([]);

  //Function to retrive category data associated with given video
  const getCategories = async () => {
    let categoryList2 = [];
    catListKeys = Object.keys(videoDetails.categories);
    for (let i = 0; i < catListKeys.length; i++) {
      let keyString = String(catListKeys[i]);
      if (videoDetails.categories[keyString] == true) {
        categoryList2.push(
          <View key={i} style={styles.link}>
            <Text style={styles.category_txt}>{keyString}</Text>
          </View>
        );
      }
    }
    setCategoryList(categoryList2);
  };

  const [nounAV, setNounAV] = useState([]);
  //Function to retrieve whether the provided dictionary entry is for a noun, adjective, verb, or some combination of the three
  const getNounAV = async () => {
    let nounAV2 = [];
    for (let i = 0; i < videoDetails.nounAV.length; i++) {
      if (videoDetails.nounAV[i].isPressed == true) {
        let word = "";
        if (i == 0) word = "noun";
        else if (i == 1) word = "adjective";
        else word = "verb";
        nounAV2.push(
          <Text key={i} style={{ paddingVertical: 10, paddingRight: 10 }}>
            {word}
          </Text>
        );
      }
    }
    setNounAV(nounAV2);
  };

  //Helper function for getASLData function below
  //Modifies state variables by creating a copy
  function aslHelperFunction(buttonStates, setButtonStates, i) {
    const newButtonStates = [...buttonStates];
    newButtonStates[i].isPressed = !newButtonStates[i].isPressed;
    setButtonStates(newButtonStates);
  }

  //Function to retrieve the ASL / sign data for a video (e.g. palm movement)
  const getASLData = async () => {
    for (let i = 0; i < videoDetails.handshape.length; i++) {
      // Handshape (First set)
      if (videoDetails.handshape[i].isPressed) {
        aslHelperFunction(handshapeButtonStates, setHandshapeButtonStates, i);
      }
    }
    for (let i = 0; i < videoDetails.handshape2.length; i++) {
      // Handshape (Second Set)
      if (videoDetails.handshape2[i].isPressed) {
        aslHelperFunction(handshape2ButtonStates, setHandshape2ButtonStates, i);
      }
    }
    for (let i = 0; i < videoDetails.palmOrientation; i++) {
      // Palm Orientation (1st Set)
      if (videoDetails.palmOrientation[i].isPressed) {
        aslHelperFunction(po1ButtonStates, setPO1ButtonStates, i);
      }
    }
    for (let i = 0; i < videoDetails.palmOrientation2.length; i++) {
      // Palm Orientation (Second Set)
      if (videoDetails.palmOrientation2[i].isPressed) {
        aslHelperFunction(po2ButtonStates, setPO2ButtonStates, i);
      }
    }
    for (let i = 0; i < videoDetails.bodyLocation.length; i++) {
      // Body Location
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
      // Palm Movement
      if (videoDetails.palmMovement[i].isPressed) {
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

  //Code to manage state of heart/like icon
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
      {!videoDetailsReady ? (
        //Conditional Rendering
        //While the selected video is loading, displays a hard-coded dictionary definition for the word "Water"
        <>
          <Stack.Screen options={{ title: "Video Example" }} />
          <ScrollView>
            <Video //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
              style={styles.videos}
              resizeMode="cover"
              source={require("../../videos/water.mov")}
              useNativeControls
              isLooping
              shouldPlay="false"
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              onLoad={loadVideo}
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
        //Once selected video has loaded, display it as a dictionary entry
        <>
          <Stack.Screen options={{ title: videoDetails.Word }} />
          <ScrollView>
            <Video // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
              style={styles.videos}
              resizeMode="cover"
              source={{ uri: params.uri }}
              useNativeControls
              isLooping
              shouldPlay="false"
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              onLoad={loadVideoDetails}
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
              <View>
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
  videos: {
    height: Dimensions.get("window").height - 140,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  category_txt: {
    fontSize: 17,
    color: "white",
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    backgroundColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: "50%",
    backgroundColor: Themes.colors.blue,
    marginRight: 5,
  },
  definition_container: {
    flex: 1,
    padding: 15,
  },

  definition_header: {
    fontWeight: "bold",
    fontSize: 15,
  },
  definition_txt: {
    padding: 10,
  },
  part_speech: {
    padding: 10,
  },
  grouping_container: {
    width: "100%",
    paddingBottom: 75,
    paddingHorizontal: 15,
  },

  grouping_txt: {
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
  handshape_image: {
    flex: 1,
    height: 140,
    borderRadius: 10,
  },

  handshape: {
    flexDirection: "row",
    width: 90,
    justifyContent: "center",
    alignItems: "flex-end",
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
  po2_captionContainer: {
    position: "absolute",
    backgroundColor: colors.extraLightGrey,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  po2_captionText: {
    color: colors.black,
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
  captionContainer: {
    position: "absolute",
    bottom: -27,
    backgroundColor: colors.extraLightGrey,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  captionText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  nounAV_captionContainer: {
    backgroundColor: colors.extraLightGrey,
    borderRadius: 50,
    width: 100,
    paddingVertical: 15,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    borderRadius: 10,
  },
});
