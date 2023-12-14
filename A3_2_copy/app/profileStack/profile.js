import { useState } from "react";
import * as React from "react";

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Themes } from "../../assets/Themes";
import "expo-router/entry";
import { Link } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import * as MediaLibrary from "expo-media-library";
import * as VideoThumbnails from "expo-video-thumbnails";

export default function profile() {
  const [page, setPage] = useState(0);
  const [bgcolor, setBgcolor] = useState("#3498db");
  const [bgcolor2, setBgcolor2] = useState(Themes.colors.lightGrey);
  const [videoList, setVideoList] = useState([]);
  const [videosUpdated, setVideosUpdated] = useState(false);
  const [numDefinitions, setNumDefinitions] = useState(6);

  React.useEffect(() => {
    //Checks if TrainGone Media Album Exists On Phone
    //If not, hard-coded examples images are conditionally rendered to show what the profile page could look like
    async function checkAlbumExists() {
      const album = await MediaLibrary.getAlbumAsync("TrainGone");
      if (album) {
        getVideo();
      }
    }

    //Converts iOS PHAsset Videos to Usable Video Files -- From https://stackoverflow.com/questions/70835286/how-to-fetch-videos-from-mobile-gallery-and-display-them-using-react-native-vide
    const generateAssetURI = (phURI) => {
      const uriId = phURI.split("/")[2];
      return `assets-library://asset/asset.mp4?id=${uriId}&ext=mp4`;
    };

    //Gets Videos From TrainGone Media Album
    async function getVideo() {
      const album = await MediaLibrary.getAlbumAsync("TrainGone");

      // https://stackoverflow.com/questions/74793812/react-dynamically-added-components-not-rendered
      let assets = await MediaLibrary.getAssetsAsync({
        album: album,
        mediaType: "video",
      });

      let videoList2 = [...videoList];

      //Iterate over all videos in TrainGone album
      for (let i = 0; i < assets.assets.length; i++) {
        if (i + 2 < assets.assets.length) {
          //Generate Thumbnails For Videos -- From https://docs.expo.dev/versions/latest/sdk/video-thumbnails/
          const thumbURI = await VideoThumbnails.getThumbnailAsync(
            generateAssetURI(assets.assets[i].uri),
            {
              time: 15,
            }
          );
          const thumbURI2 = await VideoThumbnails.getThumbnailAsync(
            generateAssetURI(assets.assets[i + 1].uri),
            {
              time: 15,
            }
          );
          const thumbURI3 = await VideoThumbnails.getThumbnailAsync(
            generateAssetURI(assets.assets[i + 2].uri),
            {
              time: 15,
            }
          );

          //Push row of three clickable images (clicking on them links to the profileVideoView page, which then loads the specified video)
          videoList2.push(
            <View key={i}>
              <View style={styles.videos_container}>
                <Link
                  asChild
                  href={{
                    pathname: "profileStack/profileVideoView",
                    params: {
                      id: assets.assets[i].id,
                      uri: generateAssetURI(assets.assets[i].uri),
                    },
                  }}
                >
                  <Pressable style={styles.video_button}>
                    <Image
                      style={styles.video_individual}
                      source={{ uri: thumbURI.uri }}
                    />
                  </Pressable>
                </Link>
                <Link
                  asChild
                  href={{
                    pathname: "profileStack/profileVideoView",
                    params: {
                      id: assets.assets[i + 1].id,
                      uri: generateAssetURI(assets.assets[i + 1].uri),
                    },
                  }}
                >
                  <Pressable style={styles.video_button}>
                    <Image
                      style={styles.video_individual}
                      source={{ uri: thumbURI2.uri }}
                    />
                  </Pressable>
                </Link>
                <Link
                  asChild
                  href={{
                    pathname: "profileStack/profileVideoView",
                    params: {
                      id: assets.assets[i + 2].id,
                      uri: generateAssetURI(assets.assets[i + 2].uri),
                    },
                  }}
                >
                  <Pressable style={styles.video_button}>
                    <Image
                      style={styles.video_individual}
                      source={{ uri: thumbURI3.uri }}
                    />
                  </Pressable>
                </Link>
              </View>
            </View>
          );
          i += 2;
        } else if (i + 1 < assets.assets.length) {
          //Generate Thumbnails For Videos -- From https://docs.expo.dev/versions/latest/sdk/video-thumbnails/
          const thumbURI = await VideoThumbnails.getThumbnailAsync(
            generateAssetURI(assets.assets[i].uri),
            {
              time: 15,
            }
          );
          const thumbURI2 = await VideoThumbnails.getThumbnailAsync(
            generateAssetURI(assets.assets[i + 1].uri),
            {
              time: 15,
            }
          );

          //Push row of two clickable images (clicking on them links to the profileVideoView page, which then loads the specified video)
          videoList2.push(
            <View key={i}>
              <View style={styles.videos_container}>
                <Link
                  asChild
                  href={{
                    pathname: "profileStack/profileVideoView",
                    params: {
                      id: assets.assets[i].id,
                      uri: generateAssetURI(assets.assets[i].uri),
                    },
                  }}
                >
                  <Pressable style={styles.video_button}>
                    <Image
                      style={styles.video_individual}
                      source={{ uri: thumbURI.uri }}
                    />
                  </Pressable>
                </Link>
                <Link
                  asChild
                  href={{
                    pathname: "profileStack/profileVideoView",
                    params: {
                      id: assets.assets[i + 1].id,
                      uri: generateAssetURI(assets.assets[i + 1].uri),
                    },
                  }}
                >
                  <Pressable style={styles.video_button}>
                    <Image
                      style={styles.video_individual}
                      source={{ uri: thumbURI2.uri }}
                    />
                  </Pressable>
                </Link>
                <View style={styles.video_button} />
              </View>
            </View>
          );
          i++;
        } else {
          //Generate Thumbnail For Video -- From https://docs.expo.dev/versions/latest/sdk/video-thumbnails/
          const thumbURI = await VideoThumbnails.getThumbnailAsync(
            generateAssetURI(assets.assets[i].uri),
            {
              time: 15,
            }
          );
          //Push row containing one clickable image (clicking on it links to the profileVideoView page, which then loads the specified video)
          videoList2.push(
            <View key={i}>
              <View style={styles.videos_container}>
                <Link
                  asChild
                  href={{
                    pathname: "profileStack/profileVideoView",
                    params: {
                      id: assets.assets[i].id,
                      uri: generateAssetURI(assets.assets[i].uri),
                    },
                  }}
                >
                  <Pressable style={styles.video_button}>
                    <Image
                      style={styles.video_individual}
                      source={{ uri: thumbURI.uri }}
                    />
                  </Pressable>
                </Link>
                <View style={styles.video_button} />
                <View style={styles.video_button} />
              </View>
            </View>
          );
        }
      }
      setVideoList(videoList2);
      if (assets.assets.length > 0) setVideosUpdated(true); //updates videosUpdated for conditional rendering IF album is not empty
      setNumDefinitions(assets.assets.length); // Sets number of definitions to the number of videos in TrainGone album
    }

    checkAlbumExists();
  }, []);

  let contentDisplayed = null;

  if (page == 0) {
    // Display "Definitions" content
    contentDisplayed = (
      <>
        {!videosUpdated ? (
          // TrainGone album does not exist OR empty => Display hard-coded image previews instead
          <>
            <View style={styles.videos_container}>
              <Image
                style={[styles.video_button, { opacity: 0.5 }]}
                source={require("../../assets/Images/created-video1.png")}
              />
              <Image
                style={[styles.video_button, { opacity: 0.5 }]}
                source={require("../../assets/Images/created-video2.png")}
              />
              <Image
                style={[styles.video_button, { opacity: 0.5 }]}
                source={require("../../assets/Images/created-video3.png")}
              />
            </View>
            <View style={styles.videos_container}>
              <Image
                style={[styles.video_button, { opacity: 0.5 }]}
                source={require("../../assets/Images/created-video4.png")}
              />
              <Image
                style={[styles.video_button, { opacity: 0.5 }]}
                source={require("../../assets/Images/created-video5.png")}
              />
              <Image
                style={[styles.video_button, { opacity: 0.5 }]}
                source={require("../../assets/Images/created-video6.png")}
              />
            </View>
          </>
        ) : (
          <>{videoList}</>
        )}
      </>
    );
  } else {
    // Display "Dictionary" content
    contentDisplayed = (
      <>
        <View style={styles.videos_container}>
          <Image
            style={[styles.video_button, { opacity: 0.5 }]}
            source={require("../../assets/Images/liked-video1.png")}
          />
          <Image
            style={[styles.video_button, { opacity: 0.5 }]}
            source={require("../../assets/Images/liked-video2.png")}
          />
          <Image
            style={[styles.video_button, { opacity: 0.5 }]}
            source={require("../../assets/Images/liked-video3.png")}
          />
        </View>
      </>
    );
  }

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                source={require("../../assets/Images/profile-pic.png")}
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
                <Text style={styles.statNumber}>{numDefinitions}</Text>
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
    </>
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
  header_info: {
    paddingLeft: 15,
    gap: 10,
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
  following: {
    fontWeight: "bold",
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
  video_button: {
    flex: 1,
    height: 175,
    marginTop: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  video_individual: {
    flex: 1,
    borderRadius: 10,
  },
});
