import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { IconButton } from "react-native-paper";
import { Header } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
function LearnCard(props) {
  return (
    <View style={styles.container}>
      <MyHeader
        title="LEARN"
        leftPress={() => props.navigation.pop()}
        rightPress={() => console.log("Pressed right")}
      />
      <View style={styles.learn}>
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={styles.textQuestion}>
              Đố anh biết em đang nghĩ gì?
            </Text>
          </View>
          <View style={styles.cardBot}>
            <Text style={styles.textAnswer}>Đố anh biết em đang nghĩ gì? </Text>
          </View>
        </View>
      </View>
      <View style={styles.action}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/icon/check_outline/check.png")}
          />
        </TouchableOpacity>
        <Text style={styles.textButton}>Got it!</Text>
      </View>
    </View>
  );
}
const MyHeader = ({ leftPress, rightPress, title }) => {
  return (
    <Header
      barStyle="light-content"
      backgroundColor="#7098da"
      containerStyle={{
        borderBottomColor: "#7098da",
        borderBottomWidth: 0,
        zIndex: 1000,
      }}
      leftComponent={() => (
        <IconButton
          color="#fff"
          icon={require("../../assets/icon/ios_back/ios_back.png")}
          onPress={leftPress}
        />
      )}
      centerComponent={() => (
        <Text
          numberOfLines={1}
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: 16,
            height: "100%",
            textAlignVertical: "center",
            flex: 1,
          }}
        >
          {title}
        </Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  learn: {
    flex: 3,
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
    borderColor: "#4f4f4f",
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    tintColor: "#fff",
    width: 24,
    height: 24,
  },
});

export default LearnCard;
