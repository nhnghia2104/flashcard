import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { IconButton } from "react-native-paper";
import { Header } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
const data = [
  "Hợp đồng, giao kèo, khế ước, giấy ký kết Hợp đồng, giao kèo, khế ước, giấy ký kết Hợp đồng, giao kèo, khế ước, giấy ký kết Hợp đồng, giao kèo, khế ước, giấy ký kết",
  "Hợp đồng, giao kèo, khế ước, giấy ký kết Hợp đồng, giao kèo, khế ước, giấy ký kết Hợp đồng, giao kèo, khế ước, giấy ký kết Hợp đồng, giao kèo, khế ước, giấy ký kết",
  "Hợp đồng, giao kèo, khế ước, giấy ký kết Hợp đồng, giao kèo, khế ước, giấy ký kết Hợp đồng, giao kèo, khế ước, giấy ký kết Hợp đồng, giao kèo, khế ước, giấy ký kết",
  "Hợp đồng, giao kèo, khế ước, giấy ký kết Hợp đồng, giao kèo, khế ước, giấy ký kết Hợp đồng, giao kèo, khế ước, giấy ký kết Hợp đồng, giao kèo, khế ước, giấy ký kết",
];
function MultiChoiceScreen(props) {
  const handleAnswer = (index) => {
    console.log(props.data);
    console.log(index);
  };
  return (
    <View style={styles.container}>
      <MyHeader
        title="LEARN"
        leftPress={() => props.navigation.pop()}
        rightPress={() => console.log("Pressed right")}
      />
      <View style={styles.question}>
        <View style={styles.card}>
          <Text style={styles.textQuestion}>Đố anh biết em đang nghĩ gì? </Text>
        </View>
      </View>
      <View style={styles.answer}>
        <Text style={styles.answerHeader}>Choose the best answer</Text>
        <ScrollView>
          {data.map((item, index) => (
            <AnswerOption
              key={index}
              index={index}
              text={item}
              onPress={() => handleAnswer(index)}
            />
          ))}
        </ScrollView>
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
const AnswerOption = ({ index, text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.answerOption}>
        <Text style={styles.textAnswer}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  question: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  textQuestion: {
    textAlign: "center",
    color: "#333333",
    fontSize: 16,
  },
  answer: {
    flex: 2,
  },
  textAnswer: {
    fontSize: 14,
    color: "#333333",
  },
  answerHeader: {
    color: "#333333",
    fontSize: 16,
    margin: 20,
    fontWeight: "bold",
  },
  answerOption: {
    // flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
const selector = (store, props) => {
  return {
    data: store.game.data,
  };
};
export default connect(selector)(MultiChoiceScreen);
