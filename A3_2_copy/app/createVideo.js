//utilizing code from https://github.com/chelseafarley/ExpoVideoRecordingTutorials/blob/main/App.js
// and https://www.youtube.com/watch?v=9EoKurp6V0I
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
  Alert,
} from "react-native";
import { Camera, CameraType, VideoQuality } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Button from "../assets/Button";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";

import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import * as VideoThumbnails from "expo-video-thumbnails";

import { useNavigation } from "expo-router";
import { colors } from "../assets/Themes/colors";
import { Octicons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function createVideo() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.torch);
  const cameraRef = useRef(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const [wordValue, onChangeWordText] = React.useState();
  const [definitionValue, onChangeDefinitionText] = React.useState();
  const [isPressedC1, setIsPressedC1] = useState(false);
  const [isPressedC2, setIsPressedC2] = useState(false);
  const [isPressedC3, setIsPressedC3] = useState(false);
  const [isPressedC4, setIsPressedC4] = useState(false);
  const [isPressedC5, setIsPressedC5] = useState(false);
  const [isPressedC6, setIsPressedC6] = useState(false);
  const [isPressedC7, setIsPressedC7] = useState(false);

  const [thumbnailURI, setThumbnailURI] = useState("");

  let WindowHeight = Dimensions.get("window").height;
  let WindowWidth = Dimensions.get("window").width;

  const navigation = useNavigation();
  const [isSaved, setIsSaved] = useState(false);

  const [indexes, setIndexes] = useState(0);

  const [handshapeButtonStates, setHandshapeButtonStates] = useState([
    {
      isPressed: false,
      image: require("../assets/Images/A-3.png"),
      label: "A",
    },
    {
      isPressed: false,
      image: require("../assets/Images/B-3.png"),
      label: "B",
    },
    {
      isPressed: false,
      image: require("../assets/Images/C-2.png"),
      label: "C",
    },
    {
      isPressed: false,
      image: require("../assets/Images/D-2.png"),
      label: "D",
    },
  ]);

  const [handshape2ButtonStates, setHandshape2ButtonStates] = useState([
    {
      isPressed: false,
      image: require("../assets/Images/S.png"),
      label: "S",
    },
    {
      isPressed: false,
      image: require("../assets/Images/open-5.png"),
      label: "Open-5",
    },
    {
      isPressed: false,
      image: require("../assets/Images/6-W.png"),
      label: "6/W",
    },
  ]);

  const [po1ButtonStates, setPO1ButtonStates] = useState([
    {
      isPressed: false,
      image: require("../assets/Images/palm-out.png"),
      label: "Out",
    },
    {
      isPressed: false,
      image: require("../assets/Images/palm-in.png"),
      label: "In",
    },
    {
      isPressed: false,
      image: require("../assets/Images/palm-down.png"),
      label: "Down",
    },
    {
      isPressed: false,
      image: require("../assets/Images/palm-up.png"),
      label: "Up",
    },
  ]);

  const [po2ButtonStates, setPO2ButtonStates] = useState([
    {
      isPressed: false,
      image: require("../assets/Images/palm-nondominant.png"),
      label: "Facing\nnon-dominant\nside",
      pos: -85,
    },
    {
      isPressed: false,
      image: require("../assets/Images/palm-dominant.png"),
      label: "Facing\ndominant\nside",
      pos: -85,
    },
    {
      isPressed: false,
      image: require("../assets/Images/palms-facing-eachother.png"),
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

  // GPT asisted handle press.
  const handlePress = (index) => {
    const newButtonStates = [...handshapeButtonStates];
    newButtonStates[index].isPressed = !newButtonStates[index].isPressed;

    let dataCopy = data;
    dataCopy.handshape[index].isPressed = newButtonStates[index].isPressed;
    setData(dataCopy);

    setHandshapeButtonStates(newButtonStates);
  };

  const handleHandshape2Press = (index) => {
    const newHandshape2ButtonStates = [...handshape2ButtonStates];
    newHandshape2ButtonStates[index].isPressed =
      !newHandshape2ButtonStates[index].isPressed;

    let dataCopy = data;
    dataCopy.handshape2[index].isPressed =
      newHandshape2ButtonStates[index].isPressed;
    setData(dataCopy);

    setHandshape2ButtonStates(newHandshape2ButtonStates);
  };

  const handlePO1Press = (index) => {
    const newPO1ButtonStates = [...po1ButtonStates];
    newPO1ButtonStates[index].isPressed = !newPO1ButtonStates[index].isPressed;

    let dataCopy = data;
    dataCopy.palmOrientation[index].isPressed =
      newPO1ButtonStates[index].isPressed;
    setData(dataCopy);

    setPO1ButtonStates(newPO1ButtonStates);
  };
  const handlePO2Press = (index) => {
    const newPO2ButtonStates = [...po2ButtonStates];
    newPO2ButtonStates[index].isPressed = !newPO2ButtonStates[index].isPressed;

    let dataCopy = data;
    dataCopy.palmOrientation2[index].isPressed =
      newPO2ButtonStates[index].isPressed;
    setData(dataCopy);

    setPO2ButtonStates(newPO2ButtonStates);
  };
  const handleNounAVButtonPress = (index) => {
    const newNounAVButtonStates = [...nounAVButtonStates];
    newNounAVButtonStates[index].isPressed =
      !newNounAVButtonStates[index].isPressed;

    let dataCopy = data;
    dataCopy.nounAV[index].isPressed = newNounAVButtonStates[index].isPressed;
    setData(dataCopy);

    setNounAVButtonStates(newNounAVButtonStates);
  };
  const handleBodyPosPress = (index) => {
    const newBodyPosStates = [...bodyPosStates];
    newBodyPosStates[index].isPressed = !newBodyPosStates[index].isPressed;

    let dataCopy = data;
    dataCopy.bodyLocation[index].isPressed = newBodyPosStates[index].isPressed;
    setData(dataCopy);

    if (newBodyPosStates[index].color) {
      newBodyPosStates[index].color = null;
    } else {
      newBodyPosStates[index].color = colors.blue;
    }
    setBodyPosStates(newBodyPosStates);
  };

  const handlePalmMovementPress = (index) => {
    const newPalmMovementStates = [...palmMovementStates];
    setIndexes(index);
    newPalmMovementStates[index].isPressed =
      !newPalmMovementStates[index].isPressed;

    let dataCopy = data;
    dataCopy.palmMovement[index].isPressed =
      newPalmMovementStates[index].isPressed;
    setData(dataCopy);

    if (!newPalmMovementStates[index].isPressed) {
      newPalmMovementStates[index].color = "black";
      newPalmMovementStates[index].backgroundColor = colors.extraLightGrey;
    } else {
      newPalmMovementStates[index].color = "white";
      newPalmMovementStates[index].backgroundColor = colors.blue;
    }
    setPalmMovementStates(newPalmMovementStates);
  };

  const [data, setData] = useState({
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

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.usePermissions();
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  let recordVideo = () => {
    setIsRecording(true);
    let options = {
      quality: "720p",
      maxDuration: 30,
      mute: false,
    };

    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
      setIsRecording(false);
    });
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      stopRecording();
      setVideo(result.assets[0]);
      const thumbURI = await VideoThumbnails.getThumbnailAsync(
        result.assets[0].uri,
        {
          time: 15,
        }
      );
      setThumbnailURI(thumbURI.uri);
    }
  };

  let stopRecording = () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };

  if (video) {
    let saveVideo = async () => {
      //Checks Media Library Permissions
      const status = (await MediaLibrary.getPermissionsAsync())
        .accessPrivileges;
      if (status !== "all") {
        //If missing permissions, send an alert that links to device's settings page
        Alert.alert(
          "Missing Permissions",
          "Access To All Photos Required To Upload A Video",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Go To Settings",
              onPress: () => {
                console.log("Settings Pressed");
                Linking.openSettings();
              },
            },
          ]
        );
      } else {
        const cachedAsset = await MediaLibrary.createAssetAsync(video.uri); // https://stackoverflow.com/questions/61132921/expo-medialibrary-createalbumasync-is-creating-multiple-album-with-same-name
        const albumName = "TrainGone";
        const album = await MediaLibrary.getAlbumAsync(albumName);

        //Save Video to Device's Local Storage (Stored in TrainGone Album)
        if (album) {
          await MediaLibrary.addAssetsToAlbumAsync(
            [cachedAsset],
            album,
            false
          ).then(() => {
            navigation.navigate("profileStack");
            // router.push("/app/profileStack/profile");
          });
        } else {
          const asset = await MediaLibrary.createAssetAsync(video.uri);
          await MediaLibrary.createAlbumAsync(albumName, asset).then(() => {
            navigation.navigate("profileStack");
          });
        }

        //Store Video Data Using AsyncStorage
        try {
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem(cachedAsset.id, jsonValue);
        } catch (e) {
          // saving error
        }
      }
    };

    let continueToUpload = async () => {
      if (isSaved) setIsSaved(false);
      else setIsSaved(true);

      const thumbURI = await VideoThumbnails.getThumbnailAsync(video.uri, {
        time: 15,
      });
      setThumbnailURI(thumbURI.uri);
    };

    return (
      <SafeAreaView style={styles.container}>
        {!isSaved ? (
          <>
            <Tabs.Screen
              options={{
                headerShown: false,
              }}
            />
            <Video
              style={styles.video}
              source={{ uri: video.uri }}
              useNativeControls
              resizeMode="cover"
              isLooping
              shouldPlay
            >
              <View
                style={{
                  position: "absolute",
                  top: 25,
                  left: 30,
                  zIndex: 2,
                }}
              >
                <TouchableOpacity onPress={() => setVideo(undefined)}>
                  <AntDesign name="left" size={35} color="grey" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  position: "absolute",
                  top: 15,
                  left: WindowWidth - 75,
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignContent: "space-between",
                  zIndex: 2,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setType(
                      type === CameraType.back
                        ? CameraType.front
                        : CameraType.back
                    );
                  }}
                >
                  <FontAwesome
                    name="volume-up"
                    size={45}
                    color="grey"
                    style={{ paddingVertical: 10 }}
                  />
                </TouchableOpacity>
                <Ionicons
                  name="ios-text"
                  size={45}
                  color="grey"
                  style={{ paddingVertical: 10 }}
                />
                <FontAwesome
                  name="magic"
                  size={45}
                  color="grey"
                  style={{ paddingVertical: 10 }}
                />
              </View>
            </Video>

            <Button
              title="Continue to Upload"
              onPress={() => continueToUpload()}
            />
            <Button title="Discard" onPress={() => setVideo(undefined)} />
          </>
        ) : (
          <View style={styles.editVideoContainer}>
            <Tabs.Screen
              options={{
                headerShown: true,
                title: "New Definition",
                headerLeft: () => (
                  <TouchableOpacity onPress={() => continueToUpload()}>
                    <AntDesign
                      name="left"
                      size={25}
                      color="black"
                      style={{ paddingLeft: 20 }}
                    />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity onPress={() => saveVideo()}>
                    <Text
                      style={{
                        color: "blue",
                        paddingRight: 17,
                        fontSize: 20,
                      }}
                    >
                      Upload
                    </Text>
                  </TouchableOpacity>
                ),
              }}
            />
            <TouchableWithoutFeedback
              onPress={() => Keyboard.dismiss()}
              accessible={false}
            >
              <View style={styles.thumbnailRow}>
                <View style={styles.thumbnailPlaceholder}>
                  <Image
                    style={{ flex: 1, borderRadius: 10 }}
                    source={{ uri: thumbnailURI }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "white",
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      marginLeft: 15,
                      marginTop: 15,
                      marginBottom: 7,
                      flex: 1,
                      backgroundColor: "#f4f4f4",
                      borderRadius: 15,
                    }}
                  >
                    <TextInput
                      editable
                      multiline
                      numberOfLines={4}
                      onChangeText={(text) => onChangeWordText(text)}
                      onEndEditing={(text) => {
                        let dataCopy = data;
                        dataCopy.Word = wordValue;
                        setData(dataCopy);
                      }}
                      value={wordValue}
                      placeholder="Word"
                      style={{ padding: 10, width: "100%", height: "100%" }}
                    />
                  </View>
                  <View
                    style={{
                      marginLeft: 15,
                      marginBottom: 15,
                      marginTop: 7,
                      flex: 1,
                      backgroundColor: "#f4f4f4",
                      borderRadius: 15,
                    }}
                  >
                    <TextInput
                      editable
                      multiline
                      numberOfLines={4}
                      onChangeText={(text) => onChangeDefinitionText(text)}
                      onEndEditing={(text) => {
                        let dataCopy = data;
                        dataCopy.Definition = definitionValue;
                        setData(dataCopy);
                      }}
                      value={definitionValue}
                      placeholder="Definition"
                      style={{ padding: 10, width: "100%", height: "100%" }}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View style={styles.nounAVrow}>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-evenly",
                  }}
                >
                  {nounAVButtonStates.map((button, index, image) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleNounAVButtonPress(index)}
                      activeOpacity={1}
                    >
                      <View style={styles.handshape}>
                        <View
                          style={[
                            styles.nounAV_captionContainer,
                            button.isPressed
                              ? { backgroundColor: "#6ba4ff" }
                              : null,
                          ]}
                          bottom={button.pos}
                        >
                          <Text
                            style={styles.nounAV_captionText}
                            numberOfLines={1}
                          >
                            {button.label}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>

            <View style={styles.category_container}>
              <Text style={styles.category_txt}>Add Categories</Text>
              <ScrollView
                style={[
                  {
                    flexDirection: "row",
                    marginTop: 5,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 10,
                  },
                  { maxHeight: 100 },
                ]}
                horizontal={true}
                keyboardShouldPersistTaps="handled"
              >
                <TouchableOpacity
                  onPress={() => {
                    let dataCopy = data;
                    dataCopy.categories.Movies = !isPressedC1;
                    setData(data);
                    isPressedC1 ? setIsPressedC1(false) : setIsPressedC1(true);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      marginRight: 20,
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      name="ios-videocam"
                      size={40}
                      color={isPressedC1 ? colors.trainGoneBlue : colors.grey}
                    />
                    <Text>Movies</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    let dataCopy = data;
                    dataCopy.categories.Adventure = !isPressedC2;
                    setData(data);
                    isPressedC2 ? setIsPressedC2(false) : setIsPressedC2(true);
                  }}
                >
                  <View style={styles.item}>
                    <MaterialIcons
                      name="explore"
                      size={44}
                      color={isPressedC2 ? colors.spotify : colors.grey}
                    />
                    <Text>Adventure</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    let dataCopy = data;
                    dataCopy.categories.Sports = !isPressedC3;
                    setData(data);
                    isPressedC3 ? setIsPressedC3(false) : setIsPressedC3(true);
                  }}
                >
                  <View style={styles.item}>
                    <MaterialIcons
                      name="sports-basketball"
                      size={44}
                      color={isPressedC3 ? colors.orange : colors.grey}
                    />
                    <Text>Sports</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    let dataCopy = data;
                    dataCopy.categories.Weather = !isPressedC4;
                    setData(data);
                    isPressedC4 ? setIsPressedC4(false) : setIsPressedC4(true);
                  }}
                >
                  <View style={styles.item}>
                    <MaterialCommunityIcons
                      name="apple-icloud"
                      size={44}
                      color={isPressedC4 ? colors.darkGrey : colors.grey}
                    />
                    <Text>Weather</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    let dataCopy = data;
                    dataCopy.categories.Food = !isPressedC5;
                    setData(data);
                    isPressedC5 ? setIsPressedC5(false) : setIsPressedC5(true);
                  }}
                >
                  <View style={styles.item}>
                    <MaterialCommunityIcons
                      name="food-apple"
                      size={44}
                      color={isPressedC5 ? colors.spotify : colors.grey}
                    />
                    <Text>Food</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    let dataCopy = data;
                    dataCopy.categories.Drinks = !isPressedC6;
                    setData(data);
                    isPressedC6 ? setIsPressedC6(false) : setIsPressedC6(true);
                  }}
                >
                  <View style={styles.item}>
                    <MaterialCommunityIcons
                      name="cup"
                      size={44}
                      color={isPressedC6 ? colors.blue : colors.grey}
                    />
                    <Text>Drinks</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    let dataCopy = data;
                    dataCopy.categories.Greetings = !isPressedC7;
                    setData(data);
                    isPressedC7 ? setIsPressedC7(false) : setIsPressedC7(true);
                  }}
                >
                  <View style={styles.item}>
                    <MaterialCommunityIcons
                      name="human-greeting"
                      size={44}
                      color={isPressedC7 ? colors.black : colors.grey}
                    />
                    <Text>Greetings</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={styles.grouping_container}>
                <Text style={styles.grouping_txt}> Handshape</Text>
                <View style={styles.handshape_container}>
                  {handshapeButtonStates.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handlePress(index)}
                      activeOpacity={1}
                    >
                      <View style={styles.handshape}>
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
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={[styles.grouping_container, { paddingTop: 0 }]}>
                <View style={[styles.handshape_container, { paddingTop: 0 }]}>
                  {handshape2ButtonStates.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleHandshape2Press(index)}
                      activeOpacity={1}
                    >
                      <View style={styles.handshape}>
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
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.grouping_container}>
                <Text style={styles.grouping_txt}> Palm Orientation</Text>
                <View style={styles.po_container}>
                  {po1ButtonStates.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handlePO1Press(index)}
                      activeOpacity={1}
                    >
                      <View style={styles.handshape}>
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
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.po2_container}>
                  {po2ButtonStates.map((button, index, image) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handlePO2Press(index)}
                      activeOpacity={1}
                    >
                      <View style={styles.handshape}>
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
                          <Text
                            style={styles.po2_captionText}
                            numberOfLines={3}
                          >
                            {button.label}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.grouping_container}>
                <Text style={styles.grouping_txt}>Select Body Location</Text>
                <Image
                  style={styles.full_body_img}
                  source={require("../assets/Images/body-outline-3.png")}
                />
                <View>
                  {bodyPosStates.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleBodyPosPress(index)}
                      activeOpacity={1}
                    >
                      <View
                        style={styles.small_circle}
                        backgroundColor={button.color}
                        bottom={button.y}
                        left={button.x}
                      ></View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.grouping_container}>
                <Text style={styles.grouping_txt}>Palm Movement</Text>
                <View style={styles.palm_movement_container}>
                  {palmMovementStates.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handlePalmMovementPress(index)}
                      activeOpacity={1}
                    >
                      <View
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
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    );
  }

  return (
    <>
      <Tabs.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {!image ? (
          <Camera
            style={styles.camera}
            type={type}
            ref={cameraRef}
            flashMode={Camera.Constants.FlashMode.auto}
          >
            {!isRecording ? (
              <>
                <View
                  style={{
                    position: "absolute",
                    top: 70,
                    left: 30,
                  }}
                >
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="ios-close" size={35} color="grey" />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: "absolute",
                    top: 60,
                    left: WindowWidth - 75,
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setType(
                        type === CameraType.front
                          ? CameraType.back
                          : CameraType.front
                      );
                    }}
                  >
                    <MaterialIcons
                      name="flip-camera-android"
                      size={45}
                      color="grey"
                      style={{ paddingVertical: 10 }}
                    />
                  </TouchableOpacity>
                  <Ionicons
                    name="ios-flash-off"
                    size={45}
                    color="grey"
                    style={{ paddingVertical: 10 }}
                  />
                  <FontAwesome
                    name="magic"
                    size={45}
                    color="grey"
                    style={{ paddingVertical: 10 }}
                  />
                </View>
              </>
            ) : (
              <></>
            )}
            <View
              style={{
                justifyContent: "space-between",
                paddingHorizontal: 30,
              }}
            >
              <TouchableOpacity
                onPress={isRecording ? stopRecording : recordVideo}
                style={{
                  position: "absolute",
                  top: WindowHeight - 180,
                  left: WindowWidth / 2 - 40,
                }}
              >
                {isRecording ? (
                  <Ionicons name="stop-circle-outline" size={80} color="red" />
                ) : (
                  <Fontisto name="record" size={80} color="white" />
                )}
              </TouchableOpacity>
              {!isRecording ? (
                <TouchableOpacity
                  onPress={() => pickVideo()}
                  style={{
                    position: "absolute",
                    top: WindowHeight - 175,
                    left: WindowWidth - 95,
                  }}
                >
                  <MaterialIcons
                    name="photo-size-select-actual"
                    size={60}
                    color="white"
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    Upload
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
          </Camera>
        ) : (
          <></>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
    height: Dimensions.get("window").height,
  },
  editVideoContainer: {
    flex: 1,
    backgroundColor: "white",
    height: Dimensions.get("window").height,
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
    zIndex: 2,
    height: Dimensions.get("window").height,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  thumbnailRow: { flexDirection: "row", height: 200 },
  thumbnailPlaceholder: {
    width: 120,
    marginVertical: 15,
    marginLeft: 30,
    borderRadius: 15,
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
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },

  po_container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 35,
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
  nounAVrow: {
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nounAV_captionContainer: {
    backgroundColor: colors.extraLightGrey,
    borderRadius: 50,
    width: 100,
    paddingVertical: 15,
  },
  nounAV_captionText: {
    color: colors.black,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    borderRadius: 10,
  },
  item: {
    flexDirection: "column",
    marginRight: 20,
    alignItems: "center",
  },
});
