import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { IconButton } from "react-native-paper";
import { Header } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
function TrueOrFalseCard(props) {
  function checkCard(card) {
    return card.point < 2;
  }
  useEffect(() => {
    if (props.cardSet) {
      console.log("tao ne");
      var test = props.cardSet.cards.find(checkCard);
      console.log(test);
    }
  }, []);

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
        <View style={styles.groupTrueFalse}>
          <TouchableOpacity
            style={[styles.buttonContainer, { backgroundColor: "#DA7070" }]}
          >
            <Text style={styles.textButton}>False</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.textButton}>True</Text>
          </TouchableOpacity>
        </View>
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
    margin: 20,
  },
  textButton: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  action: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  groupTrueFalse: { flexDirection: "row", justifyContent: "space-between" },
  icon: {
    tintColor: "#fff",
    width: 30,
    height: 30,
  },
});

const selector = (store, props) => {
  let id = "1"; // props.route.params.idCardSet;
  return {
    cardSet: store.card.data.find((x) => x.id === id), // finding card set in list card set by id
  };
};

export default connect(selector)(TrueOrFalseCard);
