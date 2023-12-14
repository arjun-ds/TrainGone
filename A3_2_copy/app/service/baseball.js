import { useState } from "react";
import * as React from "react";
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Video } from "expo-av";
import { Link } from "expo-router";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function searchBySign() {
  const navigation = useRouter();
  const [searchText, setSearchText] = useState("");

  const [status, setStatus] = React.useState({});
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
    <ScrollView>
      <Video // All video components based on code from // https://stackoverflow.com/questions/72851324/how-to-make-expo-av-video-to-take-needed-inside-a-flatlist
        style={styles.videos}
        resizeMode="cover"
        source={require("../../videos/baseball.mov")}
        useNativeControls
        isLooping
        shouldPlay="false"
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        onReadyForDisplay={() => null}
      />
      <View
        style={styles.overlay} // components for the bottom part (name, category, definition)
      >
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
      <View style={styles.definition_container}>
        <Text style={styles.definition_header}>DEFINITION</Text>
        <Text style={styles.part_speech}>noun</Text>
        <Text style={styles.definition_txt}>
          A ball game played by two teams of nine players on a field marked by
          four bases in a diamond-shaped pattern, in which the pitcher of the
          fielding team throws the ball to batters on the batting team, who must
          complete a circuit of the bases in order to score runs.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Themes.colors.background,
    flex: 1,
  },

  description: {
    flexDirection: "row",
    alignItems: "center",
  },

  overlay: {
    backgroundColor: "white",
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
    backgroundColor: "blue",
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
});
