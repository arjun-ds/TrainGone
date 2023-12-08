import { useState } from "react";
import * as React from "react";
import { useRouter } from "expo-router";
import {
  Button,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Themes } from "../../assets/Themes";
// import { router, Link } from "expo-router";
// import "expo-router/entry";

import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../assets/Themes/colors";
import { Octicons } from "@expo/vector-icons";

export default function searchBySign() {
  const navigation = useRouter();
  const [searchText, setSearchText] = useState("");

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={24}
            color="black"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search by Word"
            placeholderTextColor={Themes.colors.grey}
            style={styles.searchBar}
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
            onSubmitEditing={() => navigation.push("feed/Greetings")}
          />
        </View>
        <View style={styles.result_container}>
          <View style={styles.videos_container}>
            <View style={styles.video_individual}></View>
            <View style={styles.video_individual}></View>
            <View style={styles.video_individual}></View>
          </View>
        </View>
        <View style={styles.result_container}>
          <View style={styles.videos_container}>
            <View style={styles.video_individual}></View>
            <View style={styles.video_individual}></View>
            <View style={styles.video_individual}></View>
          </View>
        </View>
        <View style={styles.result_container}>
          <View style={styles.videos_container}>
            <View style={styles.video_individual}></View>
            <View style={styles.video_individual}></View>
            <View style={styles.video_individual}></View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //backgroundColor: "pink",
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 45,
    paddingHorizontal: 10,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginHorizontal: 30,
    marginBottom: 10, // Added marginBottom for spacing
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
    marginTop: 10, // Adjusted marginTop for spacing
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: -1, height: 3 },
  },

  grouping_container: {
    width: "100%",
    paddingBottom: 120,
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

  category_txt: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },

  result_container: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 10,
  },

  videos_container: {
    flexDirection: "row",
    width: "100%",
  },

  video_individual: {
    flex: 1,
    // flexDirection: "row",
    backgroundColor: Themes.colors.lightGrey,
    height: 200,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});
