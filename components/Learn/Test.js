import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Header } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { set } from "react-native-reanimated";
import { connect } from "react-redux";
import MultiChoiceScreen from "./MultiChoiceScreen";
function Test({ cardSet, handleAnswer, currentCardIndex }) {
  return (
    <MultiChoiceScreen
      cardSet={cardSet}
      currentCardIndex={currentCardIndex}
      handleAnswer={(isAnswer) => handleAnswer(isAnswer)}
    />
  );
}
const styles = StyleSheet.create({
  learn: {
    flex: 7,
    justifyContent: "center",
    alignContent: "center",
  },
  card: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  cardTop: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#BDBDBD",
    justifyContent: "center",
    alignContent: "center",
  },
  cardBot: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textQuestion: {
    textAlign: "center",
    color: "#4f4f4f",
    fontSize: 16,
    fontWeight: "bold",
  },
  textAnswer: {
    textAlign: "center",
    color: "#4f4f4f",
    fontSize: 16,
  },
  buttonContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#70DA7B",
  },
  textButton: {
    color: "#70DA7B",
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  action: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    tintColor: "#fff",
    width: 30,
    height: 30,
  },
});
export default Test;
