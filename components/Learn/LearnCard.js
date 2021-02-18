import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ActivityIndicator } from "react-native";
import { IconButton } from "react-native-paper";
import { Header } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { increaseCardPointInCardSet } from "../../actions/CardSet";

import GetCard from "./GetCard";
import Test from "./Test";
function LearnCard(props) {
  const [index, setIndex] = useState(0);
  const [cardList, setCardList] = useState([]);
  const [status, setStatus] = useState("loading");
  function checkPoint(card) {
    return card.point < 2;
  }
  useEffect(() => {
    if (props.cardSet) {
      var card = props.cardSet.cards.filter(checkPoint).slice(0, 5);
      setCardList(card);
      if (card[index].got == false) {
        setStatus("learn");
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <MyHeader
        title="LEARN"
        leftPress={() => props.navigation.pop()}
        rightPress={() => console.log("Pressed right")}
      />

      {status == "loading" && <Loading />}
      {status == "learn" && cardList.length != 0 && (
        <GetCard
          data={cardList[index].data}
          onPressGotIt={() => setStatus("test")}
        />
      )}
      {status == "test" && cardList.length != 0 && <Test />}
    </View>
  );
}
const MyHeader = ({ leftPress, rightPress, title }) => {
  return (
    <Header
      barStyle="light-content"
      backgroundColor="#7098da"
      containerStyle={styles.headerContainer}
      leftComponent={() => (
        <IconButton
          color="#fff"
          icon={require("../../assets/icon/close/close.png")}
          onPress={leftPress}
        />
      )}
      centerComponent={() => (
        <Text numberOfLines={1} style={styles.headerText}>
          {title}
        </Text>
      )}
      rightComponent={() => <View></View>}
    />
  );
};
const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#7098da" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    borderBottomColor: "#7098da",
    borderBottomWidth: 0,
    zIndex: 1000,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    height: "100%",
    textAlignVertical: "center",
    flex: 1,
  },
});

const selector = (store, props) => {
  let id = props.route.params.idCardSet;
  return {
    cardSet: store.card.data.find((x) => x.id == id),
  };
};
export default connect(selector)(LearnCard);
