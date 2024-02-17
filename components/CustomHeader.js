import * as React from "react";
import {
  Pressable,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Text,
  Image,
  View
} from "react-native";
//import { Image } from 'expo-image';
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.headersection, styles.home2FlexBox]}>
      <View style={styles.viewModeParent}>
        <View style={styles.textProfile}>
          <Text style={[styles.home1, styles.home1Typo]}>Welcome To Payload</Text>
        </View>
      </View>
        {/* <View style={styles.asetProfile}>
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Image
              style={styles.pictureProfileIcon}
              contentFit="cover"
              source={require("../assets/picture-profile5.png")}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Notification1')}>
            <Image
              style={styles.bellPinIcon}
              contentFit="cover"
              source={require("../assets/bell-pin.png")}
            />
          </Pressable>
        </View> */}


  </View>
  );
};

const styles = StyleSheet.create({
  headersection: {
    display: 'flex',
    paddingVertical: 60,
    flexDirection: "row",
    alignSelf: "stretch",
    width: '100%'
  },
  home2FlexBox: {
    // paddingHorizontal: Padding.p_lg,
    justifyContent: "space-between",
    alignItems: "center",
  },
  asetProfile: {
    width: 101,
    flexDirection: "row",
    alignItems: "center",
  },
  pictureProfileIcon: {
    width: 43,
    height: 43,
    overflow: "hidden",
    marginRight: 20
  },
  textProfile: {
    height: 24,
    marginLeft: 20
  },
  home1: {
    textAlign: "left",
    color: Color.white,
  },
  home1Typo: {
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    textAlign: "left",
    fontSize: 20,
  },
  viewModeParent: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellPinWrapper: {
    paddingHorizontal: Padding.p_9xs,
    marginLeft: 15,
    paddingVertical: Padding.p_10xs,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  bellPinIcon: {
    width: 24,
    height: 24,
  },
});

export default CustomHeader;
