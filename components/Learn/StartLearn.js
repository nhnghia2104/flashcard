import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
function StartLearn({ onPress }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={require("../../assets/icon/cool_large/cool.png")}
      />
      <Text style={styles.textHeader}>Let's start.</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  textHeader: {
    fontSize: 20,
    letterSpacing: 0.5,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFC30C",
    fontFamily: "Akaya Telivigala",
    marginTop: 20,
  },
  icon: {
    width: 90,
    height: 90,
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 60,
    backgroundColor: "#FFDB6C",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#fff",
  },
});
export default StartLearn;
