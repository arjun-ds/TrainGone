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

import { useNavigation } from "expo-router";

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

  let WindowHeight = Dimensions.get("window").height;
  let WindowWidth = Dimensions.get("window").width;

  const navigation = useNavigation();

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
    // console.log("pick video result" + result.assets[0].uri);
    if (!result.canceled) {
      stopRecording();
      setVideo(result.assets[0]);
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

    return (
      <SafeAreaView style={styles.container}>
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
                  type === CameraType.back ? CameraType.front : CameraType.back
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
        {hasMediaLibraryPermission ? (
          <Button title="Save" onPress={saveVideo} />
        ) : undefined}
        <Button title="Discard" onPress={() => setVideo(undefined)} />
      </SafeAreaView>
    );
  }

  return (
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
