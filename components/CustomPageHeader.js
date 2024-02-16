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

const CustomPageHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.headersection, styles.home2FlexBox]}>
        <Pressable onPress={() => navigation.goBack()}>
            <View style={[styles.wrapperSpaceBlock]}>
            <Image
                style={styles.arrowLeft}
                contentFit="cover"
                source={require("../assets/arrow-left.png")}
            />
            <Text style={styles.noticeBoard1}>{title}</Text>
            </View>
        </Pressable>
  </View>
  );
};

const styles = StyleSheet.create({
  headersection: {
    paddingVertical: 20,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  home2FlexBox: {
    paddingHorizontal: Padding.p_lg,
    justifyContent: "space-between",
    alignItems: "center",
  },
  noticeBoard1: {
    fontSize: FontSize.size_5xl,
    textAlign: "left",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    color: Color.black,
  },
  wrapperSpaceBlock: {
    marginTop: 20,
    paddingVertical: Padding.p_5xs,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  arrowLeft: {
    width: 24,
    height: 24,
    marginRight: 10
  },
});

export default CustomPageHeader;
