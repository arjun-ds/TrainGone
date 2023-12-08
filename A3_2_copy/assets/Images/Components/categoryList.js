import { useState } from "react";
import * as React from "react";

import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
// import { router, Link } from "expo-router";
import "expo-router/entry";
import { Stack } from "expo-router/stack";
import { Link } from "expo-router";
import { colors } from "../../Themes/colors";
import { FontAwesome5 } from "@expo/vector-icons";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const CategoryList = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={[styles.container, { maxHeight: 100 }]}
      horizontal={true}
    >
      <View style={styles.item}>
        <Link style={styles.linkContainer} href={{ pathname: "feed/Drinks" }}>
          <Ionicons
            name="ios-videocam"
            size={50}
            color={colors.trainGoneBlue}
          />
        </Link>
        <Text style={styles.itemText}>Movies</Text>
      </View>
      <View style={styles.item}>
        <Link style={styles.linkContainer} href={{ pathname: "feed/Drinks" }}>
          <MaterialIcons name="explore" size={54} color={colors.spotify} />
        </Link>
        <Text style={styles.itemText}>Adventure</Text>
      </View>
      <View style={styles.item}>
        <Link style={styles.linkContainer} href={{ pathname: "feed/Sports" }}>
          <MaterialIcons
            name="sports-basketball"
            size={54}
            color={colors.orange}
          />
        </Link>
        <Text style={styles.itemText}>Sports</Text>
      </View>
      <View style={styles.item}>
        <Link style={styles.linkContainer} href={{ pathname: "feed/Drinks" }}>
          <MaterialCommunityIcons
            name="apple-icloud"
            size={54}
            color={colors.lightGrey}
          />
        </Link>
        <Text style={styles.itemText}>Weather</Text>
      </View>
      <View style={styles.item}>
        <Link style={styles.linkContainer} href={{ pathname: "feed/Drinks" }}>
          <MaterialCommunityIcons
            name="food-apple"
            size={54}
            color={colors.spotify}
          />
        </Link>
        <Text style={styles.itemText}>Food</Text>
      </View>
      <View style={styles.item}>
        <Link style={styles.linkContainer} href={{ pathname: "feed/Drinks" }}>
          <MaterialCommunityIcons name="cup" size={54} color={colors.blue} />
        </Link>
        <Text style={styles.itemText}>Drinks</Text>
      </View>
      <View style={styles.item}>
        <Link
          style={styles.linkContainer}
          href={{ pathname: "feed/Greetings" }}
        >
          <MaterialCommunityIcons
            name="human-greeting"
            size={54}
            color={colors.lightGrey}
          />
        </Link>
        <Text style={styles.itemText}>Greetings</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderWidth: 1,
    // borderColor: "black",
    borderRadius: 10,
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

export default CategoryList;
