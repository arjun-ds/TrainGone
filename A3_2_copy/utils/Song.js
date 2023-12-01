import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { Themes } from "../assets/Themes";
import millisToMinutesAndSeconds from "./millisToMinutesAndSeconds";

const Song = ({ track, index }) => (
  <View style={styles.container}>
    <View style={styles.index_container}>
      <Text style={styles.index_txt} numberOfLines={1} ellipsizeMode="tail">
        {"" + (index + 1)}
      </Text>
    </View>
    <Image style={styles.image_container} source={{ uri: track.imageUrl }} />
    <View style={styles.title_and_artist}>
      <Text style={styles.title_txt} numberOfLines={1} ellipsizeMode="tail">
        {track.songTitle}
      </Text>
      <Text style={styles.artist_txt} numberOfLines={1} ellipsizeMode="tail">
        {track.songArtists.map((artist) => artist.name).join(", ")}
      </Text>
    </View>
    <View style={styles.album_container}>
      <Text style={styles.album} numberOfLines={1} ellipsizeMode="tail">
        {track.albumName}
      </Text>
    </View>
    <View style={styles.time_container}>
      <Text style={styles.time} numberOfLines={1} ellipsizeMode="tail">
        {millisToMinutesAndSeconds(track.duration)}
      </Text>
    </View>
  </View>
);

export default Song;

const styles = StyleSheet.create({
  container: {
    //width: "100%",
    flexDirection: "row",
    //backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 25,
    justifyContent: "space-between",
    gap: 10,
  },
  index_container: {
    width: "5%",
    //backgroundColor: Themes.colors.spotify,
  },
  title_and_artist: {
    width: "30%",
    //backgroundColor: Themes.colors.spotify,
  },
  album_container: {
    width: "30%",
    //backgroundColor: Themes.colors.spotify,
  },
  index_txt: {
    color: Themes.colors.white,
  },
  title_txt: {
    color: Themes.colors.white,
  },
  artist_txt: {
    color: Themes.colors.gray,
  },
  album: {
    color: Themes.colors.white,
  },
  time: {
    color: Themes.colors.white,
  },
  image_container: {
    flex: 1,
    resizeMode: "contain",
    height: "200%",
    width: "22%",
    //backgroundColor: Themes.colors.spotify,
  },
  time_container: {
    width: "10%",
    //backgroundColor: Themes.colors.spotify,
  },
});
