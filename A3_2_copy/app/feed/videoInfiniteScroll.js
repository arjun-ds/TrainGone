import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { colors } from "../../assets/Themes/colors";
import { Stack } from "expo-router/stack";
import { Link } from "expo-router";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Video } from "expo-av";
import { Themes } from "../../assets/Themes";
import * as React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

// Page displays a hard-coded list of Videos & related data components
// Our initial intention was to dynamically load and display videos through a FlatList -- We were unable to do so due to time and resource constraints
export default function videoInfiniteScroll() {
  const [status, setStatus] = React.useState({});

  const router = useRouter();
  const params = useLocalSearchParams();
  let WindowHeight = Dimensions.get("window").height - useBottomTabBarHeight();

  // State variables for heart/like icon
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
        <ScrollView
          disableIntervalMomentum={true}
          snapToInterval={WindowHeight}
          decelerationRate={0.9}
        >
          <Video // All video components based on code from // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
            style={styles.videos}
            resizeMode="cover"
            source={require("../../videos/hello.mov")}
            useNativeControls
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={() => null}
          />

          <View style={styles.overlay}>
            <View style={styles.description}>
              <Text style={styles.overlayText}>What's up?</Text>
              <View style={styles.link}>
                <Link href={{ pathname: "feed/Greetings" }}>
                  <Text style={styles.category_txt}>Greetings</Text>
                </Link>
              </View>
            </View>
            <Pressable onPress={adjustHeart}>
              <Ionicons name={id} size={30} color="red" />
            </Pressable>
          </View>
          <Video
            style={styles.videos}
            resizeMode="cover"
            source={require("../../videos/goodtoseeyou.mov")}
            useNativeControls
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={() => null}
          />

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
              <Ionicons name={id} size={30} color="red" />
            </Pressable>
          </View>
          <Video
            style={styles.videos}
            resizeMode="cover"
            source={require("../../videos/whatsup.mov")}
            useNativeControls
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={() => null}
          />

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
              <Ionicons name={id} size={30} color="red" />
            </Pressable>
          </View>
          <Video
            style={styles.videos}
            resizeMode="cover"
            source={require("../../videos/milk.mov")}
            useNativeControls
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={() => null}
          />

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
              <Ionicons name={id} size={30} color="red" />
            </Pressable>
          </View>
          <Video
            style={styles.videos}
            resizeMode="cover"
            source={require("../../videos/water.mov")}
            useNativeControls
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={() => null}
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
          <Video
            style={styles.videos}
            resizeMode="cover"
            source={require("../../videos/baseball.mov")}
            useNativeControls
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={() => null}
          />

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
              <Ionicons name={id} size={30} color="red" />
            </Pressable>
          </View>
          <Video
            style={styles.videos}
            resizeMode="cover"
            source={require("../../videos/football.mov")}
            useNativeControls
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={() => null}
          />

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
              <Ionicons name={id} size={30} color="red" />
            </Pressable>
          </View>
          <Video
            style={styles.videos}
            resizeMode="cover"
            source={require("../../videos/coffee.mov")}
            useNativeControls
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={() => null}
          />
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
              <Ionicons name={id} size={30} color="red" />
            </Pressable>
          </View>
          <Video
            style={styles.videos}
            resizeMode="cover"
            source={require("../../videos/soccer.mov")}
            useNativeControls
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onReadyForDisplay={() => null}
          />

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
              <Ionicons name={id} size={30} color="red" />
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
  },
  videos: {
    height: Dimensions.get("window").height - 140,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
});
