import { useState } from "react";
import * as React from "react";
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
  const [handshapeButtonStates, setHandshapeButtonStates] = useState([
    {
      isPressed: false,
      image: require("../../assets/Images/A-3.png"),
      label: "A",
    },
    {
      isPressed: false,
      image: require("../../assets/Images/B-3.png"),
      label: "B",
    },
    {
      isPressed: false,
      image: require("../../assets/Images/C-2.png"),
      label: "C",
    },
    {
      isPressed: false,
      image: require("../../assets/Images/D-2.png"),
      label: "D",
    },
  ]);

  const [po1ButtonStates, setPO1ButtonStates] = useState([
    {
      isPressed: false,
      image: require("../../assets/Images/palm-out.png"),
      label: "Out",
    },
    {
      isPressed: false,
      image: require("../../assets/Images/palm-in.png"),
      label: "In",
    },
    {
      isPressed: false,
      image: require("../../assets/Images/palm-down.png"),
      label: "Down",
    },
    {
      isPressed: false,
      image: require("../../assets/Images/palm-up.png"),
      label: "Up",
    },
  ]);

  const [po2ButtonStates, setPO2ButtonStates] = useState([
    {
      isPressed: false,
      image: require("../../assets/Images/palm-nondominant.png"),
      label: "Facing\nnon-dominant\nside",
      pos: -85,
    },
    {
      isPressed: false,
      image: require("../../assets/Images/palm-dominant.png"),
      label: "Facing\ndominant\nside",
      pos: -85,
    },
    {
      isPressed: false,
      image: require("../../assets/Images/palms-facing-eachother.png"),
      label: "Facing\neach other",
      pos: -75,
    },
  ]);

  const [bodyPosStates, setBodyPosStates] = useState([
    {
      isPressed: false,
      color: null,
      x: 25,
      y: 135,
    },
    {
      isPressed: false,
      color: null,
      x: 70,
      y: 130,
    },
    {
      isPressed: false,
      color: null,
      x: 125,
      y: 121,
    },
    {
      isPressed: false,
      color: null,
      x: 230,
      y: 95,
    },
    {
      isPressed: false,
      color: null,
      x: 270,
      y: 55,
    },
    {
      isPressed: false,
      color: null,
      x: 270,
      y: 125,
    },
    {
      isPressed: false,
      color: null,
      x: 230,
      y: 155,
    },
    {
      isPressed: false,
      color: null,
      x: 235,
      y: 255,
    },
    {
      isPressed: false,
      color: null,
      x: 260,
      y: 210,
    },
  ]);

  const [palmMovementStates, setPalmMovementStates] = useState([
    {
      isPressed: false,
      name: "arrow-right",
      color: "black",
    },
    {
      isPressed: false,
      name: "arrow-left",
      color: "black",
    },
    {
      isPressed: false,
      name: "arrow-switch",
      color: "black",
    },
  ]);

  const handlePress = (index) => {
    const newButtonStates = [...handshapeButtonStates];
    newButtonStates[index].isPressed = !newButtonStates[index].isPressed;
    setHandshapeButtonStates(newButtonStates);
  };

  const handlePO1Press = (index) => {
    const newPO1ButtonStates = [...po1ButtonStates];
    newPO1ButtonStates[index].isPressed = !newPO1ButtonStates[index].isPressed;
    setPO1ButtonStates(newPO1ButtonStates);
  };
  const handlePO2Press = (index) => {
    const newPO2ButtonStates = [...po2ButtonStates];
    newPO2ButtonStates[index].isPressed = !newPO2ButtonStates[index].isPressed;
    setPO2ButtonStates(newPO2ButtonStates);
  };
  const handleBodyPosPress = (index) => {
    const newBodyPosStates = [...bodyPosStates];
    newBodyPosStates[index].isPressed = !newBodyPosStates[index].isPressed;
    if (newBodyPosStates[index].color) {
      newBodyPosStates[index].color = null;
    } else {
      newBodyPosStates[index].color = "blue";
    }
    setBodyPosStates(newBodyPosStates);
  };
  const handlePalmMovementPress = (index) => {
    const newPalmMovementStates = [...palmMovementStates];
    newPalmMovementStates[index].isPressed =
      !newPalmMovementStates[index].isPressed;
    setPalmMovementStates(newPalmMovementStates);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.grouping_container}>
          <Text style={styles.grouping_txt}> Handshape</Text>
          <View style={styles.handshape_container}>
            {handshapeButtonStates.map((button, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(index)}
                activeOpacity={1}
              >
                <View style={styles.handshape}>
                  <Image style={styles.handshape_image} source={button.image} />
                  <View
                    style={[
                      styles.captionContainer,
                      button.isPressed
                        ? { backgroundColor: colors.grey }
                        : null,
                    ]}
                  >
                    <Text style={styles.captionText}>{button.label}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.grouping_container}>
          <Text style={styles.grouping_txt}> Palm Orientation</Text>
          <View style={styles.po_container}>
            {po1ButtonStates.map((button, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePO1Press(index)}
                activeOpacity={1}
              >
                <View style={styles.handshape}>
                  <Image style={styles.handshape_image} source={button.image} />
                  <View
                    style={[
                      styles.captionContainer,
                      button.isPressed
                        ? { backgroundColor: colors.grey }
                        : null,
                    ]}
                  >
                    <Text style={styles.captionText}>{button.label}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.po2_container}>
            {po2ButtonStates.map((button, index, image) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePO2Press(index)}
                activeOpacity={1}
              >
                <View style={styles.handshape}>
                  <Image style={styles.handshape_image} source={button.image} />
                  <View
                    style={[
                      styles.po2_captionContainer,
                      button.isPressed
                        ? { backgroundColor: colors.grey }
                        : null,
                    ]}
                    bottom={button.pos}
                  >
                    <Text style={styles.po2_captionText} numberOfLines={3}>
                      {button.label}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.grouping_container}>
          <Text style={styles.grouping_txt}>Select Body Location</Text>
          <Image
            style={styles.full_body_img}
            source={require("../../assets/Images/body-outline-3.png")}
          />
          <View style={styles.bodyPos_container}>
            {bodyPosStates.map((button, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleBodyPosPress(index)}
                activeOpacity={1}
              >
                <View
                  style={styles.small_circle}
                  backgroundColor={button.color}
                  bottom={button.y}
                  left={button.x}
                ></View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.grouping_container}>
          <Text style={styles.grouping_txt}>Palm Movement</Text>
          <View style={styles.palm_movement_container}>
            {palmMovementStates.map((button, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePalmMovementPress(index)}
                activeOpacity={1}
              >
                <Octicons
                  name={button.name}
                  size={24}
                  color={button.color}
                  style={{ transform: [{ rotate: "315deg" }] }}
                />
              </TouchableOpacity>
            ))}
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

  grouping_container: {
    width: "100%",
    paddingBottom: 120,
  },

  grouping_txt: {
    //paddingLeft: 10,
    //marginLeft: 10,
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },

  handshape_container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
  },

  po_container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 35,
  },

  po2_container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 35,
  },

  handshape_image: {
    flex: 1,
    // flexDirection: "row",
    backgroundColor: Themes.colors.lightGrey,
    height: 140,
    // width: 80,
    //marginTop: 5,
    //marginHorizontal: 5,
    borderRadius: 10,
    //marginLeft: 5,
  },

  handshape: {
    // flex: 1,
    flexDirection: "row",
    // backgroundColor: Themes.colors.orange,
    // height: 140,
    width: 90,
    //marginHorizontal: 5,
    //padding: 0,
    justifyContent: "center",
    alignItems: "flex-end",
    // borderRadius: 10,
  },
  captionContainer: {
    position: "absolute",
    bottom: -27,
    backgroundColor: colors.extraLightGrey,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  po2_captionContainer: {
    //width: "100%",
    position: "absolute",
    backgroundColor: colors.extraLightGrey,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  captionText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  po2_captionText: {
    color: colors.black,
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
  full_body_img: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
    height: 300,
  },
  small_circle: {
    height: 15,
    width: 15,
    borderRadius: "50%", // Set half of the width and height to make it a circle
    borderWidth: 1.5, // Border width
    borderColor: "black", // Border color
    position: "absolute",
  },
  palm_movement_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    // paddingTop:
  },
});
