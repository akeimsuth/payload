import * as React from "react";
import { Text,Image, StyleSheet, View, Pressable, ScrollView, Alert, TouchableOpacity, Modal } from "react-native";
// import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import Checkbox from 'expo-checkbox';
import Animated, { FadeInDown, FadeOut } from    'react-native-reanimated';
import { TextInput as RNPTextInput } from "react-native-paper";
import CustomHeader from "../components/CustomHeader";
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import { Padding, FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import CustomButton from "../components/CustomButton";
import CustomBadge from "../components/CustomBadge";
import axios from "axios";

const Home = () => {
  const navigation = useNavigation();

  const [image, setImage] = React.useState(null);
  const [mvr, setMVR] = React.useState(false);
  const [text, setText] = React.useState('none');
  const [disabled, setDisabled] = React.useState(true);
  const [upload, setUpload] = React.useState(false);
  //const [fadeAnim] = React.useState(new Animated.Value(0));
  const [info, setInfo] = React.useState({
    firstName: '',
    lastName: '',
    address: '',
    dlNumber: '',
    dob: '',
    expiry: '',
    issue: '',
    class: '',
    endorsement: ''
  });
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const extractData = async(data) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Token 7b0914ec70bc67a23c78d428431d9f37");
    
    const formdata = new FormData();
    formdata.append("document", {
        uri : data?.assets[0]?.uri,
        type: data?.assets[0]?.mimeType,
        name: 'license.jpg'
       });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };
    
    const response = await fetch("https://api.mindee.net/v1/products/mindee/us_driver_license/v1/predict", requestOptions);
    const studd = await response.json();
    setInfo({
        firstName: studd.document.inference.prediction.first_name.value || ' ',
        lastName: studd.document.inference.prediction.last_name.value,
        address: studd.document.inference.prediction.address.value,
        dlNumber: studd.document.inference.prediction.driver_license_id.value,
        dob: studd.document.inference.prediction.date_of_birth.value,
        expiry: studd.document.inference.prediction.expiry_date.value,
        issue: studd.document.inference.prediction.issued_date.value,
        class: studd.document.inference.prediction.dl_class.value,
        endorsement: studd.document.inference.prediction.endorsements.value
    })

  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log('Results: ',result);

    if (!result.canceled) {
        setUpload(false);
      setImage(result.assets[0].uri);
      extractData(result);
    }
  };
  const openOptions = () => {
    setUpload(true);
    // Alert.alert('Select an Option', 'You can either use your camera to take a picture or upload an existing image from your gallery', [
    //     {text: 'Open Camera', onPress: () => console.log('OK Pressed')},
    //     {text: ''},
    //     {text: 'Open Gallery', onPress: () => pickImage()},
    //   ])
  }



  const goToMVR = () => {
    setMVR(true);
  }
  const clearScreen = () => {
    setIsVisible(true);
    setImage(null);
    setMVR(false);
  }

  const onClose = () => {
    setIsVisible(false);
    schedulePushNotification();
  }

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Your status has been updated to pending',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
    setText('pending');
  }

//   React.useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//     }).start();
//   }, [upload]);

  return (
    <View style={styles.home}>
      <CustomHeader title={'Home'}/>
      {(!image &&!upload) &&<View style={styles.schoolNoticeBoard}>
        <View style={styles.titleSection}>
          <Text style={[styles.noticeBoard, styles.noticeBoardTypo]}>
            Welcome Big Trucks LLC
          </Text>
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.viewAll}>Contact Agent</Text>
          </Pressable>
        </View>
        <CustomBadge text={text}/>

        <Text style={styles.serviceText}>What service do you need?</Text>
        <ScrollView
          style={styles.scrollview}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollviewContent}
        >
            <TouchableOpacity onPress={() => openOptions()} style={[styles.basiccard11, styles.basiccard11FlexBox]}>
                <View style={styles.classesParent}>
                <View style={styles.asetProfile1}>
                    <Text style={[styles.classes, styles.classesTypo1]}>
                    Request an Endorsement Change
                    </Text>
                </View>
                <Text style={[styles.classes1, styles.math101Typo]}>Add a new driver</Text>
                <Text style={[styles.classes1, styles.math101Typo]}>Make changes to an existing policy</Text>
                </View>
                <View style={[styles.notobooksWrapper, styles.wrapperSpaceBlock]}>
                <Image
                    style={styles.reportcardRemovebgPreview1Icon}
                    contentFit="cover"
                    source={require("../assets/truck_blue.png")}
                />
                </View>
            </TouchableOpacity>
            <View style={[styles.basiccard11, styles.basiccard11FlexBox]}>
                <View style={styles.classesParent}>
                <View style={styles.asetProfile1}>
                    <Text style={[styles.classes, styles.classesTypo1]}>
                    Request a Certificate
                    </Text>
                </View>
                <Text style={[styles.classes1, styles.math101Typo]}>Request copy of existing policies</Text>
                <Text style={[styles.classes1, styles.math101Typo]}>Check for updated forms</Text>
                </View>
                <View style={[styles.notobooksWrapper, styles.wrapperSpaceBlock]}>
                <Image
                    style={styles.reportcardRemovebgPreview1Icon}
                    contentFit="cover"
                    source={require("../assets/certificate.png")}
                />
                </View>
            </View>
        </ScrollView>
      </View>}
      {upload && 
        <View style={styles.schoolNoticeBoard}>
                <View style={styles.titleSection}>
                <Text style={[styles.noticeBoard, styles.noticeBoardTypo]}>
                    Welcome Big Trucks LLC
                </Text>
                <Pressable onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.viewAll}>Contact Agent</Text>
                </Pressable>
                </View>
                <CustomBadge text={text}/>
                <Animated.View
                key={'uniqueKey'}
                entering={FadeInDown.duration(600)}
                exiting={FadeOut.duration(400)}
            >
                <Text style={{ fontSize: 14, fontWeight: '500',marginTop: 20, textAlign: 'center'}}>Upload your driver's license to get started</Text>
                <TouchableOpacity onPress={() => pickImage()} style={styles.uploadBox}>
                <MaterialIcons name="upload" color="#FFF" size={40} />
                <Text style={{ fontSize: 16, color: Color.white, fontWeight: '500'}}>Click here to upload your driver's license</Text>
                </TouchableOpacity>
            </Animated.View>
          </View>
            }
      {(image && !mvr) &&
        <View style={styles.schoolNoticeBoard}>
                <Spinner
                visible={!info?.firstName}
                textContent={'Loading...'}
                />
            <View style={styles.titleSection}>
                <Text style={[styles.noticeBoard, styles.noticeBoardTypo]}>
                Welcome Big Trucks LLC
                </Text>
                <Pressable onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.viewAll}>Contact Agent</Text>
                </Pressable>
            </View>
            <CustomBadge text={text}/>
            <View style={styles.licenseHead}>
                <Image source={{ uri: image }} style={{ width: 200, height: 100 }} />
                <Text style={{fontSize: 16, fontWeight:'500', marginTop: 10}}>Confirm the license data below</Text>
            </View>
            <ScrollView
                style={styles.scrollview1}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={styles.scrollviewLicenseContent}
            >
                <View style={styles.licenseForm}>
                    <View>
                        <Text>First Name</Text>
                    <RNPTextInput
                        style={styles.inputBg}
                        mode="outlined"
                        placeholderTextColor="rgba(0, 0, 0, 0.87)"
                        value={info.firstName}
                        onChangeText={(text) => setInfo({ ...info, firstName: text })}
                        theme={{
                            fonts: {
                            regular: { fontFamily: "Roboto", fontWeight: "Regular" },
                            },
                            colors: { text: "rgba(0, 0, 0, 0.87)" },
                        }}
                    />
                    </View>
                    <View>
                        <Text>Middle Name</Text>
                    <RNPTextInput
                        style={styles.inputBg}
                        mode="outlined"
                        placeholderTextColor="rgba(0, 0, 0, 0.87)"
                        theme={{
                            fonts: {
                            regular: { fontFamily: "Roboto", fontWeight: "Regular" },
                            },
                            colors: { text: "rgba(0, 0, 0, 0.87)" },
                        }}
                    />
                    </View>
                    <View>
                        <Text>Last Name</Text>
                    <RNPTextInput
                        style={styles.inputBg}
                        mode="outlined"
                        placeholderTextColor="rgba(0, 0, 0, 0.87)"
                        value={info.lastName}
                        onChangeText={(text) => setInfo({ ...info, lastName: text })}
                        theme={{
                            fonts: {
                            regular: { fontFamily: "Roboto", fontWeight: "Regular" },
                            },
                            colors: { text: "rgba(0, 0, 0, 0.87)" },
                        }}
                    />
                    </View>
                    <View>
                        <Text>Address</Text>
                    <RNPTextInput
                        style={styles.inputBg}
                        mode="outlined"
                        placeholderTextColor="rgba(0, 0, 0, 0.87)"
                        value={info.address}
                        onChangeText={(text) => setInfo({ ...info, address: text })}
                        theme={{
                            fonts: {
                            regular: { fontFamily: "Roboto", fontWeight: "Regular" },
                            },
                            colors: { text: "rgba(0, 0, 0, 0.87)" },
                        }}
                    />
                    </View>
                    <View>
                        <Text>Driver License Number</Text>
                    <RNPTextInput
                        style={styles.inputBg}
                        mode="outlined"
                        placeholderTextColor="rgba(0, 0, 0, 0.87)"
                        value={info.dlNumber}
                        onChangeText={(text) => setInfo({ ...info, dlNumber: text })}
                        theme={{
                            fonts: {
                            regular: { fontFamily: "Roboto", fontWeight: "Regular" },
                            },
                            colors: { text: "rgba(0, 0, 0, 0.87)" },
                        }}
                    />
                    </View>
                    <View>
                        <Text>Date of Birth</Text>
                    <RNPTextInput
                        style={styles.inputBg}
                        mode="outlined"
                        placeholderTextColor="rgba(0, 0, 0, 0.87)"
                        value={info.dob}
                        onChangeText={(text) => setInfo({ ...info, dob: text })}
                        theme={{
                            fonts: {
                            regular: { fontFamily: "Roboto", fontWeight: "Regular" },
                            },
                            colors: { text: "rgba(0, 0, 0, 0.87)" },
                        }}
                    />
                    </View>
                    <View>
                        <Text>Issuance Date</Text>
                    <RNPTextInput
                        style={styles.inputBg}
                        mode="outlined"
                        placeholderTextColor="rgba(0, 0, 0, 0.87)"
                        value={info.issue}
                        onChangeText={(text) => setInfo({ ...info, issue: text })}
                        theme={{
                            fonts: {
                            regular: { fontFamily: "Roboto", fontWeight: "Regular" },
                            },
                            colors: { text: "rgba(0, 0, 0, 0.87)" },
                        }}
                    />
                    </View>
                    <View>
                        <Text>Expiration Date</Text>
                    <RNPTextInput
                        style={styles.inputBg}
                        mode="outlined"
                        placeholderTextColor="rgba(0, 0, 0, 0.87)"
                        value={info.expiry}
                        onChangeText={(text) => setInfo({ ...info, expiry: text })}
                        theme={{
                            fonts: {
                            regular: { fontFamily: "Roboto", fontWeight: "Regular" },
                            },
                            colors: { text: "rgba(0, 0, 0, 0.87)" },
                        }}
                    />
                    </View>
                    <View>
                        <Text>Endorsements</Text>
                    <RNPTextInput
                        style={styles.inputBg}
                        mode="outlined"
                        placeholderTextColor="rgba(0, 0, 0, 0.87)"
                        value={info.endorsement}
                        onChangeText={(text) => setInfo({ ...info, endorsement: text })}
                        theme={{
                            fonts: {
                            regular: { fontFamily: "Roboto", fontWeight: "Regular" },
                            },
                            colors: { text: "rgba(0, 0, 0, 0.87)" },
                        }}
                    />
                    </View>
                    <View>
                        <Text>Restrictions</Text>
                    <RNPTextInput
                        style={styles.inputBg}
                        mode="outlined"
                        placeholderTextColor="rgba(0, 0, 0, 0.87)"
                        theme={{
                            fonts: {
                            regular: { fontFamily: "Roboto", fontWeight: "Regular" },
                            },
                            colors: { text: "rgba(0, 0, 0, 0.87)" },
                        }}
                    />
                    </View>
                    <View>
                        <Text>Class</Text>
                    <RNPTextInput
                        style={styles.inputBg}
                        mode="outlined"
                        placeholderTextColor="rgba(0, 0, 0, 0.87)"
                        value={info.class}
                        onChangeText={(text) => setInfo({ ...info, class: text })}
                        theme={{
                            fonts: {
                            regular: { fontFamily: "Roboto", fontWeight: "Regular" },
                            },
                            colors: { text: "rgba(0, 0, 0, 0.87)" },
                        }}
                    />
                    </View>
                </View>
                <View style={styles.section}>
                    <Checkbox style={styles.checkbox} value={!disabled} onValueChange={() => setDisabled(!disabled)} />
                    <Text style={styles.paragraph}>Check to verify that info above is correct</Text>
                </View>
                {/* <View style={styles.licenseForm}>
                </View> */}
            </ScrollView>
            <View style={{ marginBottom: 20, marginTop: 20}}>
                <CustomButton text={'Next'} isLoading={isLoading} toggleLoading={goToMVR} disabled={disabled}/>
            </View>
      </View>
      }
      {mvr && <View style={styles.schoolNoticeBoard}>
            <View style={styles.titleSection}>
                <Text style={[styles.noticeBoard, styles.noticeBoardTypo]}>
                Welcome Big Trucks LLC
                </Text>
                <Pressable onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.viewAll}>Contact Agent</Text>
                </Pressable>
            </View>
            <CustomBadge text={text}/>
            <View style={styles.mvrContainer}>
                <View style={{ display: 'flex', flexDirection: 'column', height: 180, alignItems:'center'}}>
                    <CustomButton text={'Upload MVR for Driver'} color={Color.colorGray_300}/>
                    <Text style={{ fontSize: 12, color: Color.colorGray_400}}>OR</Text>
                    <CustomButton text={'New MVR Request'} color={Color.colorGray_400} toggleLoading={clearScreen}/>
                </View>
            </View>
            </View>}
            <Modal animationType="slide"  visible={isVisible}>
                <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 40}}>
                    <Image
                        style={{ width: 160, height: 160}}
                        source={require("../assets/confetti.jpg")}
                    />
                    <Text style={{ fontSize: 30, fontWeight: '500', marginBottom: 20}}>Request Successful</Text>
                    <Text style={{ fontSize: 18, textAlign:'center'}}>Your Request has been sent to your agent to be processed.
                         Your current status has been set to pending</Text>
                </View>
                <CustomButton text={'Go Home'} toggleLoading={onClose}/>
            </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
inputBg: {
    backgroundColor: Color.white,
    marginTop: 0,
    marginRight: 5,
    alignSelf: "stretch",
    marginBottom: 10
},
section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
uploadBox: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    marginTop: 20,
    paddingVertical: 40
},
uploadImage: {
    width: 60,
    height: 60
},
mvrContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
},
scrollview1: {
    alignSelf: 'stretch',
    padding: 20,
    paddingBottom: 10
},
scrollviewLicenseContent:{
    paddingVertical: 10,
},
badge: {
    marginTop: 20,
    marginLeft: 10,
    backgroundColor: '#FF5733',
    borderRadius: 20,
    padding: 5,
    width: 90,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20
},
  serviceText: {
    paddingVertical: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 30
  },
  licenseForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  licenseHead: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  quickActionsScrollViewContent: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 50,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollview1Content: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  textTypo: {
    textAlign: "center",
    fontWeight: "500",
  },
  pickupFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  home2FlexBox: {
    paddingHorizontal: Padding.p_lg,
    justifyContent: "space-between",
    alignItems: "center",
  },
  home1Typo: {
    fontWeight: "700",
    textAlign: "left",
    fontSize: FontSize.vTextBody1_size,
  },
  noticeBoardTypo: {
    fontSize: 18,
    textAlign: "left",
    fontWeight: "700",
  },
  text: {
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    fontFamily: FontFamily.vTextButton,
    height: 17,
    width: 52,
    color: Color.black,
  },
  frame: {
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    flex: 1,
  },

  frame1: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  pictureProfileIcon: {
    width: 43,
    height: 43,
    overflow: "hidden",
  },
  textProfile: {
    width: 49,
    height: 24,
    marginLeft: 10,
  },
  viewModeIcon: {
    width: 30,
    height: 30,
  },
  noticeBoard: {
    color: Color.black,
    flex: 1,
  },
  viewAll: {
    lineHeight: 22,
    textTransform: "capitalize",
    fontFamily: FontFamily.interRegular,
    color: Color.biru,
    textAlign: "left",
    fontSize: FontSize.vTextBody1_size,
    marginLeft: 10,
  },
  titleSection: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_5xs,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "flex-start",
    // borderBottomWidth: 1,
    // borderColor: Color.black
  },

  mdibellRingIcon: {
    height: 15,
    width: 15,
    overflow: "hidden",
  },

  scrollview: {
    alignSelf: "stretch",
    width: "100%",
  },
  schoolNoticeBoard: {
    paddingHorizontal: Padding.p_base,
    alignSelf: "stretch",
    overflow: "hidden",
    backgroundColor: Color.white,
    height: '100%',
    paddingVertical: 40,
    marginTop: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },


  home: {
    height: '100%',
    // justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
    flex: 1,
    backgroundColor: '#FF5733',
  },

  scrollviewContent: {
    paddingVertical: 0
  },
  wrapperScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 22,
    paddingVertical: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  batteryBorder: {
    borderWidth: 1,
    borderStyle: "solid",
  },
  homeSpaceBlock: {
    paddingHorizontal: Padding.p_lg,
    justifyContent: "space-between",
  },
  iconLayout: {
    width: 43,
    overflow: "hidden",
  },
  classesTypo1: {
    fontWeight: "700",
    textAlign: "left",
    fontSize: 16
  },

  wrapperSpaceBlock: {
    paddingVertical: Padding.p_10xs,
    alignItems: "center",
  },

  basiccard11FlexBox: {
    marginTop: 15,
    borderRadius: Border.br_5xs,
    alignSelf: "stretch",
    alignItems: "center",
  },


  text1: {
    fontSize: FontSize.size_7xs,
    color: Color.colorGray_200,
    display: "flex",
    width: 10,
    justifyContent: "center",
    height: 9,
    textAlign: "center",
    alignItems: "center",
  },
  reportcardRemovebgPreview1Icon: {
    width: 71,
    height: 71,
  },
  basiccard11: {
    // paddingVertical: Padding.p_6xs,
    // paddingHorizontal: Padding.p_5xs,
    flexDirection: "row",
    justifyContent: "space-between",
    // borderRadius: 20,
    backgroundColor: Color.white,
    padding: 20,
    borderColor: Color.colorDimgray_100,
    borderWidth: 1
  },


});

export default Home;
