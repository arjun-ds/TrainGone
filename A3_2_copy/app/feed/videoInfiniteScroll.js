import {
  FlatList,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { colors } from "../../assets/Themes/colors";
import { millisToMinutesAndSeconds } from "../../utils";
import { Stack } from "expo-router/stack";
import { Link, Tabs } from "expo-router";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { Video, ResizeMode } from "expo-av";
import { Themes } from "../../assets/Themes";
import * as React from "react";
import VideoView from "./VideoView";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import HomeLayout from "../_layout";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function videoInfiniteScroll() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const router = useRouter();
  const params = useLocalSearchParams();
  let WindowHeight = Dimensions.get("window").height - useBottomTabBarHeight();

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
        {/* <FlatList
          data={videos}
          renderItem={({ item, index }) => (
            <VideoView videoName={item.videoName} />
          )}
          keyExtractor={(item) => item.id}
        /> */}
        <ScrollView
          disableIntervalMomentum={true}
          snapToInterval={WindowHeight}
          decelerationRate={0.9}
        >
          <Video
            style={styles.videos} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            resizeMode="cover"
            source={require("../../videos/hello.mov")}
            useNativeControls
            // resizeMode={ResizeMode.CONTAIN}
            isLooping
            // shouldPlay
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          />

          {/* <View style={styles.videos}>
            <Text>This is a pink view in your app!</Text>
          </View> */}
          <View style={styles.overlay}>
            <View style={styles.description}>
              <Text style={styles.overlayText}>Hello</Text>
              <View style={styles.link}>
                <Link href={{ pathname: "feed/Greetings" }}>
                  <Text style={styles.category_txt}>Greetings</Text>
                </Link>
              </View>
            </View>
            <Pressable onPress={adjustHeart}>
              <Ionicons name={id} size={30} color="black" />
            </Pressable>
          </View>
          <Video
            style={styles.videos} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            resizeMode="cover"
            source={require("../../videos/good_to_see_you.mov")}
            useNativeControls
            // resizeMode={ResizeMode.CONTAIN}
            isLooping
            // shouldPlay
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          />

          {/* <View style={styles.videos}>
            <Text>This is a pink view in your app!</Text>
          </View> */}
          <View style={styles.overlay}>
            <View style={styles.description}>
              <Text style={styles.overlayText}>Good To See You</Text>
              <View style={styles.link}>
                <Link href={{ pathname: "feed/Greetings" }}>
                  <Text style={styles.category_txt}>Greetings</Text>
                </Link>
              </View>
            </View>
            <Pressable onPress={adjustHeart}>
              <Ionicons name={id} size={30} color="black" />
            </Pressable>
          </View>
          <Video
            style={styles.videos} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            resizeMode="cover"
            source={require("../../videos/what's_up.mov")}
            useNativeControls
            // resizeMode={ResizeMode.CONTAIN}
            isLooping
            // shouldPlay
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          />

          {/* <View style={styles.videos}>
            <Text>This is a pink view in your app!</Text>
          </View> */}
          <View style={styles.overlay}>
            <View style={styles.description}>
              <Text style={styles.overlayText}>What's Up?</Text>
              <View style={styles.link}>
                <Link href={{ pathname: "feed/Greetings" }}>
                  <Text style={styles.category_txt}>Greetings</Text>
                </Link>
              </View>
            </View>
            <Pressable onPress={adjustHeart}>
              <Ionicons name={id} size={30} color="black" />
            </Pressable>
          </View>
          <Video
            style={styles.videos} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            resizeMode="cover"
            source={require("../../videos/milk.mov")}
            useNativeControls
            // resizeMode={ResizeMode.CONTAIN}
            isLooping
            // shouldPlay
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          />

          {/* <View style={styles.videos}>
            <Text>This is a pink view in your app!</Text>
          </View> */}
          <View style={styles.overlay}>
            <View style={styles.description}>
              <Text style={styles.overlayText}>Milk</Text>
              <View style={styles.link}>
                <Link href={{ pathname: "feed/Drinks" }}>
                  <Text style={styles.category_txt}>Drinks</Text>
                </Link>
              </View>
            </View>
            <Pressable onPress={adjustHeart}>
              <Ionicons name={id} size={30} color="black" />
            </Pressable>
          </View>
          <Video
            style={styles.videos} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            resizeMode="cover"
            source={require("../../videos/water.mov")}
            useNativeControls
            // resizeMode={ResizeMode.CONTAIN}
            isLooping
            // shouldPlay
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          />

          {/* <View style={styles.videos}>
            <Text>This is a pink view in your app!</Text>
          </View> */}
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
              <Ionicons name={id} size={30} color="black" />
            </Pressable>
          </View>
          <Video
            style={styles.videos} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            resizeMode="cover"
            source={require("../../videos/baseball.mov")}
            useNativeControls
            // resizeMode={ResizeMode.CONTAIN}
            isLooping
            // shouldPlay
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          />

          {/* <View style={styles.videos}>
            <Text>This is a pink view in your app!</Text>
          </View> */}
          <View style={styles.overlay}>
            <View style={styles.description}>
              <Text style={styles.overlayText}>Baseball</Text>
              <View style={styles.link}>
                <Link href={{ pathname: "feed/Sports" }}>
                  <Text style={styles.category_txt}>Sports</Text>
                </Link>
              </View>
            </View>
            <Pressable onPress={adjustHeart}>
              <Ionicons name={id} size={30} color="black" />
            </Pressable>
          </View>
          <Video
            style={styles.videos} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            resizeMode="cover"
            source={require("../../videos/football.mov")}
            useNativeControls
            // resizeMode={ResizeMode.CONTAIN}
            isLooping
            // shouldPlay
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          />

          {/* <View style={styles.videos}>
            <Text>This is a pink view in your app!</Text>
          </View> */}
          <View style={styles.overlay}>
            <View style={styles.description}>
              <Text style={styles.overlayText}>Football</Text>
              <View style={styles.link}>
                <Link href={{ pathname: "feed/Sports" }}>
                  <Text style={styles.category_txt}>Sports</Text>
                </Link>
              </View>
            </View>
            <Pressable onPress={adjustHeart}>
              <Ionicons name={id} size={30} color="black" />
            </Pressable>
          </View>
          <Video
            style={styles.videos} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            resizeMode="cover"
            source={require("../../videos/coffee.mov")}
            useNativeControls
            // resizeMode={ResizeMode.CONTAIN}
            isLooping
            // shouldPlay
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          />
          {/* 
          <View style={styles.videos}>
            <Text>This is a pink view in your app!</Text>
          </View> */}
          <View style={styles.overlay}>
            <View style={styles.description}>
              <Text style={styles.overlayText}>Coffee</Text>
              <View style={styles.link}>
                <Link href={{ pathname: "feed/Drinks" }}>
                  <Text style={styles.category_txt}>Drinks</Text>
                </Link>
              </View>
            </View>
            <Pressable onPress={adjustHeart}>
              <Ionicons name={id} size={30} color="black" />
            </Pressable>
          </View>
          <Video
            style={styles.videos} // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            resizeMode="cover"
            source={require("../../videos/soccer.mov")}
            useNativeControls
            // resizeMode={ResizeMode.CONTAIN}
            isLooping
            // shouldPlay
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={updateVideoRatioOnDisplay} //https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
          />

          {/* <View style={styles.videos}>
            <Text>This is a pink view in your app!</Text>
          </View> */}
          <View style={styles.overlay}>
            <View style={styles.description}>
              <Text style={styles.overlayText}>Soccer</Text>
              <View style={styles.link}>
                <Link href={{ pathname: "feed/Sports" }}>
                  <Text style={styles.category_txt}>Sports</Text>
                </Link>
              </View>
            </View>
            <Pressable onPress={adjustHeart}>
              <Ionicons name={id} size={30} color="black" />
            </Pressable>
          </View>
        </ScrollView>
      </View>
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
    paddingRight: 20,
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
  },
  videos: {
    height: Dimensions.get("window").height - 140,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
});
