import * as React from "react";
import { Text, StyleSheet, View, Pressable, ScrollView, Alert, TouchableOpacity, Modal } from "react-native";
import { Image } from "expo-image";
import { Padding, FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const CustomBadge = ({text}) => {

    return (
        <>
            {text == 'none' &&
            <View style={{...styles.badge, backgroundColor: '#d3d3d3'}}>
                <Text style={{ color: Color.white, textTransform:'capitalize', fontWeight: '500'}}>{text}</Text>
            </View>
            }
            {text == 'pending' &&
            <View style={{...styles.badge, backgroundColor: '#C04000'}}>
                <Text style={{ color: Color.white, textTransform:'capitalize', fontWeight: '500'}}>{text}</Text>
            </View>
            }
            {text == 'success' &&
            <View style={{...styles.badge, backgroundColor: '#90ee90'}}>
                <Text style={{ color: Color.white, textTransform:'capitalize', fontWeight: '500'}}>{text}</Text>
            </View>
            }
        </>
    )
}
const styles = StyleSheet.create({
    
    
    badge: {
        marginTop: 20,
        marginLeft: 10,
        // backgroundColor: '#FF5733',
        borderRadius: 20,
        padding: 5,
        width: 90,
        display: 'flex',
        alignItems: 'center'
    },
})
export default CustomBadge;