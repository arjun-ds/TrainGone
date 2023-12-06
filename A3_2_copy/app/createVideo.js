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
} from "react-native";
import Constants from "expo-constants";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../assets/Button";
import { shareAsync } from "expo-sharing";
import { Video } from "expo-av";

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
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
      quality: "1080p",
      maxDuration: 60,
      mute: false,
    };

    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
      setIsRecording(false);
    });
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
    // const takePicture = async () => {
    //   if (cameraRef) {
    //     try {
    //       const data = await cameraRef.current.recordAsync();
    //       console.log(data);
    //       setImage(data.uri);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // };

    // const savePicture = async () => {
    //   if (image) {
    //     try {
    //       const asset = await MediaLibrary.createAssetAsync(image);
    //       alert("Picture saved! 🎉");
    //       setImage(null);
    //       console.log("saved successfully");
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // };

    // if (hasCameraPermission === false) {
    //   return <Text>No access to camera</Text>;
    // }

    return (
      <SafeAreaView style={styles.container}>
        <Video
          style={styles.video}
          source={{ uri: video.uri }}
          useNativeControls
          resizeMode="contain"
          isLooping
          shouldPlay
        />
        <Button title="Share" onPress={shareVideo} />
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
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <Button
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
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
              icon="flash"
              color={flash === Camera.Constants.FlashMode.off ? "gray" : "#fff"}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

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
          <Button
            title={isRecording ? "Stop Recording" : "Record Video"}
            onPress={isRecording ? stopRecording : recordVideo}
            icon="camera"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000",
    padding: 8,
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
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#E9730F",
    marginLeft: 10,
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
