import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Pressable,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput as RNPTextInput } from "react-native-paper";
import PhoneInput  
    from 'react-native-phone-input'; 
import CountryPicker  
    from 'react-native-country-picker-modal'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import Octicons from 'react-native-vector-icons/Octicons';
import { OtpInput } from "react-native-otp-entry";
import CustomButton from "../components/CustomButton";

const Login = () => {
  const navigation = useNavigation();
  const data = [
    { label: 'Jamaica College', value: 'Jamaica College' },
    { label: 'Wolmers', value: 'Wolmers' },
    { label: 'Immaculate', value: 'Immaculate' },
  ];
  const [value, setValue] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [oneTime, setOneTime] = React.useState('');
  const [error, setError] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(true);
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const [phoneNumber, setPhoneNumber] = React.useState(''); 
  const [countryCode, setCountryCode] = React.useState(''); 
  const [selectedCountry, setSelectedCountry] = 
      React.useState(null); 
  const [countryPickerVisible, setCountryPickerVisible] =  
      React.useState(false); 

  const onSelectCountry = (country) => { 
      setCountryCode(country.cca2); 
      setSelectedCountry(country); 
      setCountryPickerVisible(false); 
  };

  // This function will be triggered when the button is pressed
  const phoneLoading = () => {
    setIsLoading(true);
    schedulePushNotification();
    setTimeout(() => {
      setIsLoading(false);
      setValue(true);
    },3000);

  };
  const otpLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setValue(true);
      navigation.navigate('Home');
    },3000);

  };

  const otpFilled = (passcode) => {
    if(passcode == oneTime){
      setShow(true);
      setError(false);
    } else {
      setShow(false);
      setError(true);
    }
  }

//   const toggleCountryPicker = () => { 
//     setCountryPickerVisible(!countryPickerVisible); 
// }; 

async function schedulePushNotification() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  setOneTime(otp);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: `Your One time passcode is ${otp}`,
      data: { data: 'goes here' },
      sound: 'ping.wav',
    },
    trigger: { seconds: 2, channelId: 'default' },
  });
}

  return (
    <View style={styles.login}>
      <ImageBackground
        style={styles.logo1Icon}
        resizeMode="cover"
        source={require("../assets/playground_logo.png")}
      />
      <View style={styles.frameParent}>
        {!value &&
        <View style={styles.frameParent}>
          <View style={styles.usernameParent}>
          <Text style={styles.nameOfSchool}>Login</Text>
            <Text style={{fontSize: 16, marginBottom: 10}}>Please enter the phone number associated with your account.</Text>
            <PhoneInput 
                value={phoneNumber} 
                initialCountry={'us'}
                onChangePhoneNumber={(number) => setPhoneNumber(number)} 
                // onPressFlag={toggleCountryPicker} 
                style={styles.phoneInput} 
            />
          </View>
          {countryPickerVisible && ( 
                <CountryPicker 
                    withFilter={true} 
                    withFlagButton={false} 
                    withCountryNameButton={false} 
                    onSelect={onSelectCountry} 
                    onClose={() => setCountryPickerVisible(false)} 
                    visible={countryPickerVisible} 
                    containerButtonStyle={styles.countryPickerButton} 
                    closeButtonImageStyle={styles.countryPickerCloseButton} 
                /> 
            )}
          <View style={[styles.primarybutton, styles.wrapperFlexBox]}>
            <CustomButton text={'Continue'} isLoading={isLoading} toggleLoading={phoneLoading}/>
          </View>
        </View>}
        {/* OTP */}
        {value && 
        <View style={styles.frameParent}>
          <View style={styles.usernameParent}>
          <Text style={styles.nameOfSchool}>OTP</Text>
            {error && <Text style={{ color: 'red'}}>Passcode entered is incorrect</Text>}
            <Text style={{fontSize: 16, marginBottom: 10}}>Please enter the One time password sent to your phone number</Text>
            <OtpInput numberOfDigits={6} onFilled={(text) => otpFilled(text)} />
          </View>

          <View style={[styles.primarybutton, styles.wrapperFlexBox]}>
            {show &&<CustomButton text={'Continue'} isLoading={isLoading} toggleLoading={otpLoading}/>}
          </View>
        </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
countryPickerButton: { 
    borderRadius: 5, 
    backgroundColor: '#fff', 
    marginBottom: 20, 
}, 
phoneInput: { 
  height: 50, 
  width: '100%', 
  borderWidth: 1, 
  borderColor: '#ccc', 
  marginBottom: 20, 
  paddingHorizontal: 10, 
}, 
countryPickerCloseButton: { 
    width: 20, 
    height: 20, 
}, 
  icon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#EB5E56',
    padding: 8,
  },
  iconText: {
    color: '#fff',
    marginRight: 40,
    textTransform: 'capitalize'
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBg: {
    backgroundColor: Color.white,
    marginTop: 10,
    alignSelf: "stretch",
  },
  cantFindYourTypo: {

    fontSize: FontSize.vTextButton_size,
    textAlign: "left",
  },
  text: {
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    width: 52,
    height: 17,
    textAlign: "center",
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
    width: 260,
    height: 120,
    marginTop: 10,
    backgroundColor: '#c73a32',
  },
  nameOfSchool: {
    fontSize: 40,
    textAlign: "left",
    color: Color.black,
    fontWeight: "700",
    marginBottom: 20,
  },
  vInputSlot: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameOfSchoolParent: {
    alignSelf: "stretch",
    paddingVertical: 100
  },
  usernameParent: {
    marginTop: 12,
    alignSelf: "stretch",
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
    marginTop: 35,
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor:'#fff',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10
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
    // borderRadius: Border.br_25xl,
    // backgroundColor: '#c73a32',
    // width: 171,
    // height: 44,
    paddingHorizontal: Padding.p_base,
    marginTop: 100,
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
  login: {
    width: "100%",
    // paddingHorizontal: Padding.p_8xl,
    paddingVertical: 40,
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
    backgroundColor: '#FF5733',
  },
});

export default Login;
