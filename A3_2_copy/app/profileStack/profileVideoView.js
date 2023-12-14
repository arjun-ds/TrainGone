import {
  FlatList,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";

import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";

import * as React from "react";

export default function profileVideoView() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <>
      <View style={styles.container}></View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Themes.colors.background,
    flex: 1,
  },
});
