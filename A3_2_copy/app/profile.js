import { useState } from "react";
import * as React from "react";

import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Themes } from "../assets/Themes";
// import { router, Link } from "expo-router";
import "expo-router/entry";
import { Stack } from "expo-router/stack";
import { Link } from "expo-router";

import videoInfiniteScroll from "./feed/videoInfiniteScroll";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import * as MediaLibrary from "expo-media-library";
import { Video } from "expo-av";

import * as VideoThumbnails from "expo-video-thumbnails";

// const album = await MediaLibrary.getAlbumAsync(albumName);

export default function profile() {
  const [page, setPage] = useState(0);
  const [bgcolor, setBgcolor] = useState("#3498db");
  const [bgcolor2, setBgcolor2] = useState(Themes.colors.lightGrey);

  const [videoAssets, setVideoAssets] = useState();
  const [thumbnail, setThumbnail] = useState();

  const [albumExists, setAlbumExists] = useState(false);
  // const [album, setAlbum] = useState();
  const [videoList, setVideoList] = useState([]);
  const [videosUpdated, setVideosUpdated] = useState(false);

  const [finalURI, setFinalURI] = useState();

  const generateThumbnail = async () => {
    // console.log("GENTHUMB URI PARAM: " + videoURI);
    // console.log("GENTHUMB ph BEFORE: " + phURI);
    // phURI = JSON.stringify(phURI);
    // console.log("GENTHUMB ph AFTER: " + phURI);
    // let uri2 = String(assetURI);
    // console.log(uri2);
    // phURI = "ph://00240F9F-A0EA-436C-A89A-20068E9188C6";
    // assetURI = `assets-library://asset/asset.mp4?id=${phURI.slice(
    //   5,
    //   41
    // )}&ext=mp4`;

    // console.log(assetURI);

    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(finalURI, {
        time: 1500,
      });
      console.log("GENTHUMB OUTPUT URI: " + uri);
      setThumbnail(uri);
    } catch (e) {
      console.warn("GENTHUMB ERROR: " + e);
    }
  };

  //Converts iOS PHAsset Videos to Usable Video Files -- From https://stackoverflow.com/questions/70835286/how-to-fetch-videos-from-mobile-gallery-and-display-them-using-react-native-vide
  const generateAssetURI = (phURI) => {
    const uriId = phURI.split("/")[2];
    return `assets-library://asset/asset.mp4?id=${uriId}&ext=mp4`;
  };

  React.useEffect(() => {
    //Generates Thumbnail For Video -- From https://docs.expo.dev/versions/latest/sdk/video-thumbnails/
    // const generateThumbnail = async (videoURI) => {
    //   console.log("GENTHUMB URI PARAM: " + videoURI);
    //   try {
    //     const { uri } = await VideoThumbnails.getThumbnailAsync(videoURI, {
    //       time: 1500,
    //     });
    //     console.log("GENTHUMB OUTPUT URI: " + uri);
    //     setThumbnail(uri);
    //   } catch (e) {
    //     console.warn(e);
    //   }
    // };

    //Checks if TrainGone Media Album Exists On Phone
    //If not, the page will conditionally render hard-coded image examples of what the profile page might look like
    async function checkAlbumExists() {
      const album = await MediaLibrary.getAlbumAsync("TrainGone");
      if (album) {
        console.log("ALBUM EXISTS");
        setAlbumExists(true);
        getVideo();
        // setAlbum(album);
      }
    }

    // //Converts iOS PHAsset Videos to Usable Video Files -- From https://stackoverflow.com/questions/70835286/how-to-fetch-videos-from-mobile-gallery-and-display-them-using-react-native-vide
    // const generateAssetURI = (phURI) => {
    //   const uriId = phURI.split("/")[2];
    //   return `assets-library://asset/asset.mp4?id=${uriId}&ext=mp4`;
    // };

    //Gets Videos From TrainGone Media Album
    async function getVideo() {
      // console.log(phURI);
      // const phURI = "ph://00240F9F-A0EA-436C-A89A-20068E9188C6"; // https://stackoverflow.com/questions/70835286/how-to-fetch-videos-from-mobile-gallery-and-display-them-using-react-native-vide
      // const uriId = phURI.split("/")[2];
      // const assetURI = `assets-library://asset/asset.mp4?id=${uriId}&ext=mp4`;

      // generateThumbnail(assetURI);
      const album = await MediaLibrary.getAlbumAsync("TrainGone");
      // console.log("ALBUM: " + album);
      console.log("TEST");

      let assets = await MediaLibrary.getAssetsAsync({
        // https://stackoverflow.com/questions/74793812/react-dynamically-added-components-not-rendered
        album: album,
        mediaType: "video",
      });
      console.log(JSON.stringify(assets, null, 2));
      console.log("LENGTH: " + assets.assets.length);
      // console.log(JSON.stringify(videoAssets, null, 2));

      let videoList2 = [...videoList];

      for (let i = 0; i < assets.assets.length; i++) {
        console.log("VIDEO LIST: " + videoList);

        if (i + 2 < assets.assets.length) {
          // console.log("First URI: " + assets.assets[0].uri);
          console.log(
            "First ASSETURI: " + generateAssetURI(assets.assets[0].uri)
          );
          // await generateThumbnail(generateAssetURI(assets.assets[0].uri));

          phURI = assets.assets[0].uri;
          assetURI = `assets-library://asset/asset.mp4?id=${phURI.slice(
            5,
            41
          )}&ext=mp4`;
          setFinalURI(String(assetURI));
          await generateThumbnail();
          // await generateThumbnail(JSON.stringify(assets.assets[0].uri);
          console.log("first thumbnail" + thumbnail);

          videoList2.push(
            <View key={i}>
              <View style={styles.videos_container}>
                <Video
                  style={styles.video_individual} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
                  resizeMode="cover"
                  source={{
                    // uri: null,
                    uri: generateAssetURI(assets.assets[i].uri),
                  }}
                  useNativeControls
                  // resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  // shouldPlay
                  onPlaybackStatusUpdate={null}
                  onReadyForDisplay={null} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
                />
                <Video
                  style={styles.video_individual} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
                  resizeMode="cover"
                  source={{
                    // uri: null,
                    uri: generateAssetURI(assets.assets[i + 1].uri),
                  }}
                  useNativeControls
                  // resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  // shouldPlay
                  onPlaybackStatusUpdate={null}
                  onReadyForDisplay={null} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
                />
                <Video
                  style={styles.video_individual} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
                  resizeMode="cover"
                  source={{
                    // uri: null,
                    uri: generateAssetURI(assets.assets[i + 2].uri),
                  }}
                  useNativeControls
                  // resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  // shouldPlay
                  onPlaybackStatusUpdate={null}
                  onReadyForDisplay={null} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
                />
              </View>
            </View>
          );
          i += 2;
        } else if (i + 1 < assets.assets.length) {
          videoList2.push(
            <View key={i}>
              <View style={styles.videos_container}>
                <Video
                  style={styles.video_individual} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
                  resizeMode="cover"
                  source={{
                    // uri: null,
                    uri: generateAssetURI(assets.assets[i].uri),
                  }}
                  useNativeControls
                  // resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  // shouldPlay
                  onPlaybackStatusUpdate={null}
                  onReadyForDisplay={null} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
                />{" "}
                <Video
                  style={styles.video_individual} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
                  resizeMode="cover"
                  source={{
                    // uri: null,
                    uri: generateAssetURI(assets.assets[i + 1].uri),
                  }}
                  useNativeControls
                  // resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  // shouldPlay
                  onPlaybackStatusUpdate={null}
                  onReadyForDisplay={null} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
                />
              </View>
              <View style={styles.video_individual} />
            </View>
          );
          i++;
        } else {
          videoList2.push(
            <View key={i}>
              <View style={styles.videos_container}>
                <Video
                  style={styles.video_individual} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
                  resizeMode="cover"
                  source={{
                    // uri: null,
                    uri: generateAssetURI(assets.assets[i].uri),
                  }}
                  useNativeControls
                  // resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  // shouldPlay
                  onPlaybackStatusUpdate={null}
                  onReadyForDisplay={null} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
                />
                <View style={styles.video_individual} />
                <View style={styles.video_individual} />
              </View>
            </View>
          );
        }
      }
      setVideoList(videoList2);
      setVideosUpdated(true); //updates videosUpdated for conditional rendering

      // setVideoAssets(assets);
      // console.log(JSON.stringify(assets, null, 2));
      // console.log(assets.assets.length);
      // console.log(JSON.stringify(videoAssets, null, 2));
    }

    checkAlbumExists();
    // if (albumExists) getVideo();
  }, videoList);

  let contentDisplayed = null;

  if (page == 0) {
    contentDisplayed = (
      <>
        {!videosUpdated ? (
          <>
            <View style={styles.videos_container}>
              <Image
                style={styles.video_individual}
                source={require("../assets/Images/created-video1.png")}
              />
              <Image
                style={styles.video_individual}
                source={require("../assets/Images/created-video2.png")}
              />
              <Image
                style={styles.video_individual}
                source={require("../assets/Images/created-video3.png")}
              />
            </View>
            <View style={styles.videos_container}>
              <Image
                style={styles.video_individual}
                source={require("../assets/Images/created-video4.png")}
              />
              <Image
                style={styles.video_individual}
                source={require("../assets/Images/created-video5.png")}
              />
              <Image
                style={styles.video_individual}
                source={require("../assets/Images/created-video6.png")}
              />
            </View>
          </>
        ) : (
          <>
            {videoList}
            {/* <Video
            style={styles.video_individual} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            resizeMode="cover"
            source={{
              // uri: null,
              uri: assetURI,
            }}
            useNativeControls
            // resizeMode={ResizeMode.CONTAIN}
            isLooping
            // shouldPlay
            onPlaybackStatusUpdate={null}
            onReadyForDisplay={null} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          /> */}
          </>
        )}
      </>
    );
  } else {
    contentDisplayed = (
      <>
        <View style={styles.videos_container}>
          <Image
            style={styles.video_individual}
            source={require("../assets/Images/liked-video1.png")}
          />
          <Image
            style={styles.video_individual}
            source={require("../assets/Images/liked-video2.png")}
          />
          <Image
            style={styles.video_individual}
            source={require("../assets/Images/liked-video3.png")}
          />
        </View>
      </>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require("../assets/Images/profile-pic.png")}
              style={styles.profileImage}
            />
            <View style={styles.header_info}>
              <Text style={styles.username}>Dria Lee</Text>
              <View style={styles.user_status_container}>
                <View style={styles.experience_container}>
                  <Ionicons
                    name="trophy-sharp"
                    size={24}
                    color={Themes.colors.blue}
                  />
                  <Text style={styles.experience_txt}>ASL Learner</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>6</Text>
              <Text style={styles.statLabel}>Definitions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1.5k</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>200</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.followButton}
              backgroundColor={bgcolor}
              onPress={() => {
                setPage(0);
              }}
            >
              <Text style={styles.followButtonText}>Definitions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.followButton}
              backgroundColor={bgcolor2}
              onPress={() => {
                setPage(1);
              }}
            >
              <Text style={styles.followButtonText}>Dictionary</Text>
            </TouchableOpacity>
          </View>
          {contentDisplayed}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#888",
  },
  followButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  followButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  header_info: {
    paddingLeft: 15,
    gap: 10,
  },
  user_status_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  experience_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  experience_txt: {
    color: Themes.colors.blue,
    fontWeight: "bold",
  },
  following_container: {
    backgroundColor: Themes.colors.figmaPurple,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: "10%",
  },
  following: {
    fontWeight: "bold",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 30,
  },
  videos_container: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 0,
  },

  video_individual: {
    flex: 1,
    // flexDirection: "row",
    // backgroundColor: Themes.colors.lightGrey,
    height: 175,
    // width: 125,

    marginTop: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },
});
