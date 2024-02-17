import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

export default function CustomButton({text, toggleLoading, isLoading, color = "#FF5733", disabled = false}) {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleLoading} disabled={disabled}>
        <View
          style={{
            ...styles.button,
            backgroundColor: isLoading && color || disabled && '#d3d3d3' || !disabled && color,
          }}
        >
          {isLoading && <ActivityIndicator size="large" color="white" />}
          <Text style={styles.buttonText}>
            {isLoading ? "" : text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 240,
    height: 50,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  },
});