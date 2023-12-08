//https://gist.github.com/anette1983/c9238bc10be7349700f50a503362ddcc
// import React, { useState, useRef, useEffect } from "react";
// import {
//   StyleSheet,
//   Dimensions,
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
// } from "react-native";
// import { Camera } from "expo-camera";
// import { Video } from "expo-av";

// const WINDOW_HEIGHT = Dimensions.get("window").height;

// const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
// const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
//   const [isPreview, setIsPreview] = useState(false);
//   const [isCameraReady, setIsCameraReady] = useState(false);
//   const [isVideoRecording, setIsVideoRecording] = useState(false);
//   const [videoSource, setVideoSource] = useState(null);
//   const cameraRef = useRef();

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   const onCameraReady = () => {
//     setIsCameraReady(true);
//   };

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       const options = { quality: 0.5, base64: true, skipProcessing: true };
//       const data = await cameraRef.current.takePictureAsync(options);
//       const source = data.uri;
//       if (source) {
//         await cameraRef.current.pausePreview();
//         setIsPreview(true);
//         console.log("picture source", source);
//       }
//     }
//   };

//   const recordVideo = async () => {
//     if (cameraRef.current) {
//       try {
//         const videoRecordPromise = cameraRef.current.recordAsync();

//         if (videoRecordPromise) {
//           setIsVideoRecording(true);
//           const data = await videoRecordPromise;
//           const source = data.uri;
//           if (source) {
//             setIsPreview(true);
//             console.log("video source", source);
//             setVideoSource(source);
//           }
//         }
//       } catch (error) {
//         console.warn(error);
//       }
//     }
//   };

//   const stopVideoRecording = () => {
//     if (cameraRef.current) {
//       setIsPreview(false);
//       setIsVideoRecording(false);
//       cameraRef.current.stopRecording();
//     }
//   };

//   const switchCamera = () => {
//     if (isPreview) {
//       return;
//     }
//     setCameraType((prevCameraType) =>
//       prevCameraType === Camera.Constants.Type.back
//         ? Camera.Constants.Type.front
//         : Camera.Constants.Type.back
//     );
//   };

//   const cancelPreview = async () => {
//     await cameraRef.current.resumePreview();
//     setIsPreview(false);
//     setVideoSource(null);
//   };

//   const renderCancelPreviewButton = () => (
//     <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
//       <View style={[styles.closeCross, { transform: [{ rotate: "45deg" }] }]} />
//       <View
//         style={[styles.closeCross, { transform: [{ rotate: "-45deg" }] }]}
//       />
//     </TouchableOpacity>
//   );

//   const renderVideoPlayer = () => (
//     <Video
//       source={{ uri: videoSource }}
//       shouldPlay={true}
//       style={styles.media}
//     />
//   );

//   const renderVideoRecordIndicator = () => (
//     <View style={styles.recordIndicatorContainer}>
//       <View style={styles.recordDot} />
//       <Text style={styles.recordTitle}>{"Recording..."}</Text>
//     </View>
//   );

//   const renderCaptureControl = () => (
//     <View style={styles.control}>
//       <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
//         <Text style={styles.text}>{"Flip"}</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         activeOpacity={0.7}
//         disabled={!isCameraReady}
//         onLongPress={recordVideo}
//         onPressOut={stopVideoRecording}
//         onPress={takePicture}
//         style={styles.capture}
//       />
//     </View>
//   );

//   if (hasPermission === null) {
//     return <View />;
//   }

//   if (hasPermission === false) {
//     return <Text style={styles.text}>No access to camera</Text>;
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Camera
//         ref={cameraRef}
//         style={styles.container}
//         type={cameraType}
//         flashMode={Camera.Constants.FlashMode.on}
//         onCameraReady={onCameraReady}
//         onMountError={(error) => {
//           console.log("cammera error", error);
//         }}
//       />
//       <View style={styles.container}>
//         {isVideoRecording && renderVideoRecordIndicator()}
//         {videoSource && renderVideoPlayer()}
//         {isPreview && renderCancelPreviewButton()}
//         {!videoSource && !isPreview && renderCaptureControl()}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   closeButton: {
//     position: "absolute",
//     top: 35,
//     left: 15,
//     height: closeButtonSize,
//     width: closeButtonSize,
//     borderRadius: Math.floor(closeButtonSize / 2),
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#c4c5c4",
//     opacity: 0.7,
//     zIndex: 2,
//   },
//   media: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   closeCross: {
//     width: "68%",
//     height: 1,
//     backgroundColor: "black",
//   },
//   control: {
//     position: "absolute",
//     flexDirection: "row",
//     bottom: 38,
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   capture: {
//     backgroundColor: "#f5f6f5",
//     borderRadius: 5,
//     height: captureSize,
//     width: captureSize,
//     borderRadius: Math.floor(captureSize / 2),
//     marginHorizontal: 31,
//   },
//   recordIndicatorContainer: {
//     flexDirection: "row",
//     position: "absolute",
//     top: 25,
//     alignSelf: "center",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "transparent",
//     opacity: 0.7,
//   },
//   recordTitle: {
//     fontSize: 14,
//     color: "#ffffff",
//     textAlign: "center",
//   },
//   recordDot: {
//     borderRadius: 3,
//     height: 6,
//     width: 6,
//     backgroundColor: "#ff0000",
//     marginHorizontal: 5,
//   },
//   text: {
//     color: "#fff",
//   },
// });

//mix of https://github.com/chelseafarley/ExpoVideoRecordingTutorials/blob/main/App.js
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
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Constants from "expo-constants";
import { Camera, CameraType, VideoQuality } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Button from "../assets/Button";
import { shareAsync } from "expo-sharing";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";

import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import * as VideoThumbnails from "expo-video-thumbnails";
import CategoryList from "../assets/Images/Components/categoryList";

import { useNavigation } from "expo-router";
import { Themes } from "../assets/Themes";
import { colors } from "../assets/Themes/colors";
import { Octicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function createVideo() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.torch);
  const cameraRef = useRef(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

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

  let WindowHeight = Dimensions.get("window").height;
  let WindowWidth = Dimensions.get("window").width;

  const navigation = useNavigation();
  const [isSaved, setIsSaved] = useState(false);

  const generateThumbnail = async (source) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(source, {
        time: 15000,
      });
      setThumbnail(uri);
    } catch (e) {
      console.warn(e);
    }
  };

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
    setHandshapeButtonStates(newButtonStates);
  };

  const handlePO1Press = (index) => {
    const newPO1ButtonStates = [...po1ButtonStates];
    newPO1ButtonStates[index].isPressed = !newPO1ButtonStates[index].isPressed;
    setPO1ButtonStates(newPO1ButtonStates);
  };
  const handlePO2Press = (index) => {
    const newPO2ButtonStates = [...po2ButtonStates];
    newPO2ButtonStates[index].isPressed = !newPO2ButtonStates[index].isPressed;
    setPO2ButtonStates(newPO2ButtonStates);
  };
  const handleNounAVButtonPress = (index) => {
    const newNounAVButtonStates = [...nounAVButtonStates];
    newNounAVButtonStates[index].isPressed =
      !newNounAVButtonStates[index].isPressed;
    setNounAVButtonStates(newNounAVButtonStates);
  };
  const handleBodyPosPress = (index) => {
    const newBodyPosStates = [...bodyPosStates];
    newBodyPosStates[index].isPressed = !newBodyPosStates[index].isPressed;
    if (newBodyPosStates[index].color) {
      newBodyPosStates[index].color = null;
    } else {
      newBodyPosStates[index].color = colors.blue;
    }
    setBodyPosStates(newBodyPosStates);
  };
  () => navigation.push("service/searchResults");

  const handlePalmMovementPress = (index) => {
    const newPalmMovementStates = [...palmMovementStates];
    setIndexes(index);
    newPalmMovementStates[index].isPressed =
      !newPalmMovementStates[index].isPressed;
    if (!newPalmMovementStates[index].isPressed) {
      newPalmMovementStates[index].color = "black";
      newPalmMovementStates[index].backgroundColor = colors.extraLightGrey;
    } else {
      newPalmMovementStates[index].color = "white";
      newPalmMovementStates[index].backgroundColor = colors.blue;
    }
    setPalmMovementStates(newPalmMovementStates);
  };

  const handleSearch = () => {
    if (indexes === 0) {
      navigation.push("/service/searchResults");
    } else if (indexes === 1) {
      navigation.push("/service/searchResults2");
    } else if (indexes === 2) {
      navigation.push("/service/searchResults3");
    }
  };
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  if (
    hasCameraPermission === undefined ||
    hasMicrophonePermission === undefined
  ) {
    return <Text>Requestion permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted.</Text>;
  }
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
    console.log("pick video result" + result.assets[0].uri);
    if (!result.canceled) {
      stopRecording();
      setVideo(result.assets[0]);
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        decodeURI(result.assets[0].uri)
      );
      setThumbnail(thumbURI);
      console.log("thumb: " + thumbnail + " thumb : " + thumbURI);
      // setIsRecording(false);
    }
  };

  let stopRecording = () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };

  if (video) {
    let shareVideo = () => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    let saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    let continueToUpload = () => {
      if (isSaved) setIsSaved(false);
      else setIsSaved(true);
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
                {/* <FontAwesome5 name="magic" size={45} color="grey" /> */}
              </View>
              {/* <View
            style={{
              position: "absolute",
              top: WindowHeight - 180,
              left: WindowWidth / 2 - 40,
              zIndex: 2,
            }}
          >
            <TouchableOpacity
              onPress={isRecording ? stopRecording : recordVideo}
            >
              <Ionicons
                name="ios-checkmark-circle-sharp"
                size={80}
                color="grey"
              />
            </TouchableOpacity>
          </View> */}
            </Video>
            {/* <Button title="Share" onPress={shareVideo} /> */}
            {/* {hasMediaLibraryPermission ? ( */}
            <Button
              title="Continue to Upload"
              onPress={() => continueToUpload()}
            />
            {/* ) : ( */}

            {/* <Button title="Save" onPress={navigation.navigate("editVideo")} /> */}
            <></>
            {/* )} */}
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
                      size={35}
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
                        paddingRight: 20,
                        fontSize: 20,
                      }}
                    >
                      Share
                    </Text>
                  </TouchableOpacity>
                ),
              }}
            />
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View style={styles.thumbnailRow}>
                <View style={styles.thumbnailPlaceholder} />
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
                      // maxLength={40}
                      onChangeText={(text) => onChangeWordText(text)}
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
                      // maxLength={40}
                      onChangeText={(text) => onChangeDefinitionText(text)}
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
                            // adjustsFontSizeToFit
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
                {/* <TouchableOpacity style={styles.nounAVButton}>
                <Text style={styles.nounAVText}>Noun</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nounAVButton}>
                <Text style={styles.nounAVText}>Adjective</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nounAVButton}>
                <Text style={styles.nounAVText}>Word</Text>
              </TouchableOpacity> */}
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
                    // borderWidth: 1,
                    // borderColor: "black",
                    borderRadius: 10,
                  },
                  { maxHeight: 100 },
                ]}
                horizontal={true}
                keyboardShouldPersistTaps="handled"
              >
                <TouchableOpacity
                  onPress={() =>
                    isPressedC1 ? setIsPressedC1(false) : setIsPressedC1(true)
                  }
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
                    <Text style={styles.item.txt}>Movies</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    isPressedC2 ? setIsPressedC2(false) : setIsPressedC2(true)
                  }
                >
                  <View style={styles.item}>
                    <MaterialIcons
                      name="explore"
                      size={44}
                      color={isPressedC2 ? colors.spotify : colors.grey}
                    />
                    <Text style={styles.item.txt}>Adventure</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    isPressedC3 ? setIsPressedC3(false) : setIsPressedC3(true)
                  }
                >
                  <View style={styles.item}>
                    <MaterialIcons
                      name="sports-basketball"
                      size={44}
                      color={isPressedC3 ? colors.orange : colors.grey}
                    />
                    <Text style={styles.item.txt}>Sports</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    isPressedC4 ? setIsPressedC4(false) : setIsPressedC4(true)
                  }
                >
                  <View style={styles.item}>
                    <MaterialCommunityIcons
                      name="apple-icloud"
                      size={44}
                      color={isPressedC4 ? colors.lightGrey : colors.grey}
                    />
                    <Text style={styles.item.txt}>Weather</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    isPressedC5 ? setIsPressedC5(false) : setIsPressedC5(true)
                  }
                >
                  <View style={styles.item}>
                    <MaterialCommunityIcons
                      name="food-apple"
                      size={44}
                      color={isPressedC5 ? colors.spotify : colors.grey}
                    />
                    <Text style={styles.item.txt}>Food</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    isPressedC6 ? setIsPressedC6(false) : setIsPressedC6(true)
                  }
                >
                  <View style={styles.item}>
                    <MaterialCommunityIcons
                      name="cup"
                      size={44}
                      color={isPressedC6 ? colors.blue : colors.grey}
                    />
                    <Text style={styles.item.txt}>Drinks</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    isPressedC7 ? setIsPressedC7(false) : setIsPressedC7(true)
                  }
                >
                  <View style={styles.item}>
                    <MaterialCommunityIcons
                      name="human-greeting"
                      size={44}
                      color={isPressedC7 ? colors.lightGrey : colors.grey}
                    />
                    <Text style={styles.item.txt}>Greetings</Text>
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
                              ? { backgroundColor: "colors.grey" }
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
                <View style={styles.bodyPos_container}>
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
            // resolution={VideoQuality["720p"]}
            // maxFileSize={}
          >
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
              {/* <Button
              title=""
              icon="retweet"
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <Button
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.torch
                    : Camera.Constants.FlashMode.off
                )
              }
              icon="flash"
              color={flash === Camera.Constants.FlashMode.off ? "gray" : "#fff"}
            /> */}
            </View>
            {!isRecording ? (
              <View
                style={{
                  position: "absolute",
                  top: 60,
                  left: WindowWidth - 75,
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignContent: "space-between",
                  // flex: 1,
                  // backgroundColor: "white",
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
                {/* <FontAwesome5 name="magic" size={45} color="grey" /> */}
              </View>
            ) : (
              <></>
            )}
            <View
              style={{
                // flexDirection: "row",
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
          <>
            {/* <Image source={{ uri: image }} style={styles.camera} />
          <View style={styles.controls}>
            {image ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 50,
                }}
              >
                <Button
                  title="Re-take"
                  onPress={() => setImage(null)}
                  icon="retweet"
                />
                <Button title="Save" onPress={savePicture} icon="check" />
              </View>
            ) : (
              <View></View>
            )}
          </View> */}
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000",
    // padding: 8,
    height: Dimensions.get("window").height,
  },
  editVideoContainer: {
    flex: 1,
    // justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
    // padding: 8,
    height: Dimensions.get("window").height,
  },
  controls: {
    flex: 0.5,
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
    backgroundColor: "black",
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
    backgroundColor: Themes.colors.lightGrey,
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
    adjustsFontSizeToFit: true,
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

// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Button,
//   Image,
// } from "react-native";
// import { Camera } from "expo-camera";
// import * as ImagePicker from "expo-image-picker";
// export default function App() {
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
//   const [camera, setCamera] = useState(null);
//   const [image, setImage] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   useEffect(() => {
//     (async () => {
//       const cameraStatus = await Camera.requestPermissionsAsync();
//       setHasCameraPermission(cameraStatus.status === "granted");
//       const galleryStatus =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       setHasGalleryPermission(galleryStatus.status === "granted");
//     })();
//   }, []);
//   const takePicture = async () => {
//     if (camera) {
//       const data = await camera.takePictureAsync(null);
//       //console.log(data.uri)
//       setImage(data.uri);
//     }
//   };
//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Image,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });
//     console.log(result);
//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };
//   if (hasCameraPermission === null || hasGalleryPermission === false) {
//     return <View />;
//   }
//   if (hasCameraPermission === false || hasGalleryPermission === false) {
//     return <Text>No access to camera</Text>;
//   }
//   return (
//     <View style={styles.container}>
//       <View style={styles.cameraContainer}>
//         <Camera
//           ref={(ref) => setCamera(ref)}
//           style={styles.camera}
//           type={type}
//           ratio={"1:1"}
//         />
//       </View>

//       <Button
//         style={styles.button}
//         title="Flip Image"
//         onPress={() => {
//           setType(
//             type === Camera.Constants.Type.back
//               ? Camera.Constants.Type.front
//               : Camera.Constants.Type.back
//           );
//         }}
//       ></Button>

//       <Button title="Take Picture" onPress={() => takePicture()} />
//       <Button title="Pick an Image From Gallery" onPress={() => pickImage()} />
//       {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignContent: "center",
//   },
//   camera: {
//     flex: 1,
//     aspectRatio: 1,
//   },
//   cameraContainer: {
//     flex: 1,
//     flexDirection: "column",
//   },
//   button: {
//     flex: 1,
//   },
// });

//https://javascript.plainenglish.io/make-a-camera-app-using-react-native-expo-android-ios-75b3567f5a47
// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text, View, Button, Image } from "react-native";
// import { Camera } from "expo-camera";

// export default function App() {
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [camera, setCamera] = useState(null);
//   const [image, setImage] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   useEffect(() => {
//     (async () => {
//       const cameraStatus = await Camera.requestPermissionsAsync();
//       setHasCameraPermission(cameraStatus.status === "granted");
//     })();
//   }, []);
//   const takePicture = async () => {
//     if (camera) {
//       const data = await camera.takePictureAsync(null);
//       setImage(data.uri);
//     }
//   };

//   if (hasCameraPermission === false) {
//     return <Text>No access to camera</Text>;
//   }
//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.cameraContainer}>
//         <Camera
//           ref={(ref) => setCamera(ref)}
//           style={styles.fixedRatio}
//           type={type}
//           ratio={"1:1"}
//         />
//       </View>
//       <Button
//         title="Flip Image"
//         onPress={() => {
//           setType(
//             type === Camera.Constants.Type.back
//               ? Camera.Constants.Type.front
//               : Camera.Constants.Type.back
//           );
//         }}
//       ></Button>
//       <Button title="Take Picture" onPress={() => takePicture()} />
//       {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   cameraContainer: {
//     flex: 1,
//     flexDirection: "row",
//   },
//   fixedRatio: {
//     flex: 1,
//     aspectRatio: 1,
//   },
// });

// import { useState } from "react";
// import * as React from "react";
// import { Camera, CameraType } from "expo-camera";

// import {
//   Button,
//   FlatList,
//   Image,
//   ImageBackground,
//   Pressable,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   Text,
//   View,
// } from "react-native";
// import { Themes } from "../assets/Themes";
// // import { router, Link } from "expo-router";
// import "expo-router/entry";
// import { Stack } from "expo-router/stack";
// import { Link } from "expo-router";

// import videoInfiniteScroll from "./feed/videoInfiniteScroll";

// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// export default function createVideo() {
//   const [type, setType] = useState(CameraType.back);
//   const [cameraPermission, requestCameraPermission] =
//     Camera.useCameraPermissions();
//   const [microphonePermission, requestMicrophonePermission] =
//     Camera.useMicrophonePermissions();

//   // if (!cameraPermission) Camera.reques

//   // if (!permission.granted) ...

//   function toggleCameraType() {
//     setType((current) =>
//       current === CameraType.back ? CameraType.front : CameraType.back
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} type={type}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
//             <Text style={styles.text}>Flip Camera</Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 20,
//     color: "black",
//     textAlign: "center",
//   },
// });
