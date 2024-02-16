import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Pressable,
  TouchableOpacity,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput as RNPTextInput } from "react-native-paper";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import CustomPageHeader from "../components/CustomPageHeader";

const Profile = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = React.useState(false);
 
  return (
    <View style={styles.login}>
      <CustomPageHeader title={'Agent Profile'}/>
      <View style={styles.logoContainer}>
        <Image
            style={styles.logo1Icon}
            resizeMode="cover"
            source={require("../assets/agent.jpg")}
        />
      </View>
      <Text style={{ color: Color.white, fontSize: 20, fontWeight: '600'}}>Jessica Stevens</Text>
      <View style={styles.frameParent}>
        <View style={styles.iconList}>
        <MaterialIcons name="call" color="#FF5733" size={26} />
        <MaterialIcons name="chat" color="#FF5733" size={26} />
        <MaterialIcons name="mail" color="#FF5733" size={26} />
        </View>
        <Text style={styles.agentInfo}>Agent Information</Text>
        <View style={styles.usernameParent}>
          <Text style={styles.nameOfSchool}>Email</Text>
          <Text>test@test.com</Text>
        </View>
        <View style={styles.usernameParent}>
          <Text style={styles.nameOfSchool}>Phone</Text>
          <Text>8764838392</Text>
        </View>
        <View style={styles.usernameParent}>
          <Text style={styles.nameOfSchool}>Office</Text>
          <Text>8778387372</Text>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  wrapperFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  agentInfo:{
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '500',
    marginBottom: 40
  },
  iconList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40
  },
  inputBg: {
    backgroundColor: Color.white,
    marginTop: 10,
    alignSelf: "stretch",
  },
  cantFindYourTypo: {
    fontFamily: FontFamily.vTextBody1,
    fontSize: FontSize.vTextButton_size,
    textAlign: "left",
  },
  text: {
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    width: 52,
    height: 17,
    textAlign: "center",
    fontFamily: FontFamily.vTextButton,
    color: Color.black,
    fontWeight: "500",
  },
  mobileSignalIcon: {
    width: 17,
    height: 9,
  },
  frame: {
    justifyContent: "space-between",
    flexDirection: "row",
    overflow: "hidden",
    flex: 1,
  },
  wifiIcon: {
    width: 15,
    height: 10,
  },
  rectangle: {
    borderRadius: 1,
    backgroundColor: Color.black,
    width: 18,
    height: 7,
  },
  battery: {
    borderRadius: 3,
    borderColor: Color.colorGray_500,
    borderWidth: 1,
    width: 22,
    height: 11,
    marginLeft: 10,
    borderStyle: "solid",
  },
  frame1: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  statusBar: {
    paddingHorizontal: Padding.p_smi,
    paddingTop: Padding.p_3xs,
    paddingBottom: Padding.p_8xs,
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: Color.white,
  },
  login1: {
    fontSize: FontSize.size_xl,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorDarkslategray_200,
    textAlign: "left",
    flex: 1,
  },
  loginWrapper: {
    paddingBottom: 59,
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  logo1Icon: {
    width: '100%',
    height: 180,
  },
  logoContainer: {
    overflow: 'hidden',
    width: 180,
    height: 180,
    borderColor: '#c73a32',
    borderRadius: 140,
    marginTop: 20
  },
  nameOfSchool: {
    fontSize: 20,
    textAlign: "left",
    color: Color.black,
    fontWeight: "500",
  },
  changePassword: {
    color: '#c73a32',
    fontSize: 16
  },
  vInputSlot: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameOfSchoolParent: {
    alignSelf: "stretch",
  },
  usernameParent: {
    marginTop: 12,
    alignSelf: "stretch",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  passwordParent: {
    paddingBottom: 45,
    marginTop: 12,
    alignSelf: "stretch",
  },
  forgotPassword: {
    color: "#e03838",
  },
  forgotPasswordWrapper: {
    paddingTop: Padding.p_9xs,
    paddingBottom: Padding.p_2xl,
    marginTop: 12,
    flexDirection: "row",
  },
  frameParent: {
    paddingTop: Padding.p_4xl,
    marginTop: 20,
    paddingHorizontal: 60,
    alignSelf: "stretch",
    // alignItems: "center",
    backgroundColor: Color.white,
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  text1: {
    letterSpacing: 1,
    lineHeight: 36,
    textTransform: "uppercase",
    color: Color.white,
    fontSize: FontSize.vTextButton_size,
    textAlign: "center",
    fontFamily: FontFamily.vTextButton,
    fontWeight: "500",
  },
  primarybutton: {
    borderRadius: Border.br_25xl,
    backgroundColor: '#c73a32',
    width: 171,
    height: 44,
    paddingHorizontal: Padding.p_base,
    marginTop: 10,
    flexDirection: "row",
    paddingVertical: 0,
  },
  cantFindYour: {
    color: Color.colorGray_400,
  },
  contactAdmin: {
    color: Color.colorMediumblue,
    marginLeft: 4,
  },
  cantFindYourSchoolParent: {
    paddingTop: Padding.p_29xl,
    paddingBottom: Padding.p_34xl,
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  bottomSheet:{
    display: 'flex',
    flexDirection: 'column',
    // paddingVertical: 40,
    alignItems: "center",
    backgroundColor: Color.white,
  },
  login: {
    width: "100%",
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // paddingVertical: 40,
    alignItems: "center",
    backgroundColor: '#FF5733',
  },
});

export default Profile;
