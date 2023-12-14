import { useState } from "react";
import * as React from "react";
import { useRouter } from "expo-router";
import {
  Image,
  ImageBackground,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { Themes } from "../assets/Themes";
import "expo-router/entry";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Feather } from "@expo/vector-icons";
import CategoryList from "../assets/Images/Components/categoryList";

export default function Page() {
  const navigation = useRouter();
  const [token, setToken] = useState(1);
  const [searchText, setSearchText] = useState("");

  // takes the inputText, makes it alphanumerical and lowercase, and appends it to an
  // existing string to create a specialized pathname
  const searchWord = (value) => {
    let lowerCase = value.toLowerCase();
    let query = lowerCase.replace(/[^a-zA-Z0-9]/g, "");
    const url = "service/" + query;
    navigation.push(url);
  };

  let contentDisplayed = null;
  if (token) {
    contentDisplayed = (
      <ScrollView>
        <Tabs.Screen options={{ tabBarStyle: { display: "flex" } }} />

        <View style={styles.home_container}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={24}
              color="black"
              style={styles.searchIcon}
            />
            <TouchableWithoutFeedback
              onPress={() => Keyboard.dismiss()}
              accessible={false}
            >
              <View style={{ flex: 1 }}>
                <TextInput
                  placeholder="Search by Word"
                  placeholderTextColor={Themes.colors.grey}
                  style={styles.searchBar}
                  onChangeText={(text) => setSearchText(text)}
                  value={searchText}
                  onSubmitEditing={() => searchWord(searchText)}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Pressable onPress={() => navigation.push("/service/searchBySign")}>
            <View style={styles.sign_search_container}>
              <Text style={styles.sign_search_txt}>Search by Sign</Text>
            </View>
          </Pressable>
          <View style={styles.category_container}>
            <Text style={styles.category_txt}>Search by Category</Text>
            <CategoryList />
          </View>
          <View style={styles.popular_container}>
            <View style={styles.top}>
              <Text style={styles.category_txt}>Popular Now</Text>
              <Feather
                name="arrow-right-circle"
                size={30}
                color={Themes.colors.lightGrey}
              />
            </View>
            <TouchableOpacity style={styles.videos_container} disabled={true}>
              <Image
                style={styles.video_individual}
                source={require("../assets/Images/popular-video1.png")}
              />

              <Image
                style={styles.video_individual}
                source={require("../assets/Images/popular-video2.png")}
              />
              <Image
                style={styles.video_individual}
                source={require("../assets/Images/popular-video3.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.popular_container}>
            <View style={styles.top}>
              <Text style={styles.category_txt}>Recently Watched</Text>
              <Feather
                name="arrow-right-circle"
                size={30}
                color={Themes.colors.lightGrey}
              />
            </View>
            <TouchableOpacity style={styles.videos_container} disabled={true}>
              <Image
                style={styles.video_individual}
                source={require("../assets/Images/liked-video3.png")}
              />
              <Image
                style={styles.video_individual}
                source={require("../assets/Images/liked-video2.png")}
              />
              <Image
                style={styles.video_individual}
                source={require("../assets/Images/liked-video1.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    contentDisplayed = (
      <ImageBackground
        source={{ uri: jenImage1 }}
        resizeMode="cover"
        style={styles.home_container}
      >
        <View style={styles.login_txt_container}>
          <Text style={styles.login_txt}>TrainGone</Text>
        </View>
      </ImageBackground>
    );
  }
  return contentDisplayed;
}

const styles = StyleSheet.create({
  video: { flex: 1 },
  home_container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 70,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginHorizontal: 30,
    marginBottom: 10,
    backgroundColor: Themes.colors.extraLightGrey,
    borderRadius: 50,
    paddingHorizontal: 10,
  },

  searchBar: {
    flex: 1,
    color: Themes.colors.blue,
    fontSize: 20,
  },
  searchIcon: {
    marginRight: 10,
    color: Themes.colors.grey,
  },

  sign_search_container: {
    backgroundColor: Themes.colors.figmaPurple,
    paddingHorizontal: 45,
    paddingVertical: 25,
    marginBottom: 15,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: -1, height: 3 },
  },

  category_container: {
    marginVertical: 10,
  },

  category_txt: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },

  popular_container: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 10,
  },

  videos_container: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    opacity: 0.5,
  },

  video_individual: {
    flex: 1,
    backgroundColor: Themes.colors.lightGrey,
    height: 200,
    marginTop: 10,
    marginHorizontal: 1,
    borderRadius: 10,
  },

  sign_search_txt: {
    color: Themes.colors.white,
    fontWeight: "bold",
    fontSize: 30,
  },

  login_txt_container: {
    top: "20%",
  },
  login_txt: {
    color: Themes.colors.trainGoneBlue,
    fontSize: 55,
    fontWeight: "bold",
    fontStyle: "italic",
  },

  login_pressable: {
    backgroundColor: "pink",
    alignItems: "center",
    width: 250,
    top: "75%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
    padding: 10,
  },

  pressable_txt: {
    fontWeight: "bold",
    color: Themes.colors.black,
    fontSize: 25,
  },

  container: {
    backgroundColor: Themes.colors.background,
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
    backgroundColor: Themes.colors.background,
    paddingBottom: 10,
  },

  header_txt: {
    color: Themes.colors.white,
    fontWeight: "bold",
    fontSize: 20,
  },

  auth_button: {
    backgroundColor: Themes.colors.spotify,
    borderRadius: 24,
  },

  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  auth_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 10,
  },

  spotify_logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    borderRadius: 30 / 2,
    borderWidth: 1,
    borderColor: Themes.colors.black,
  },

  auth_text: {
    color: Themes.colors.white,
    fontWeight: "bold",
  },

  item: {
    backgroundColor: Themes.colors.trainGoneBlue,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  title: {
    fontSize: 32,
  },

  image_containter: {
    backgroundColor: Themes.colors.spotify,
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
});
