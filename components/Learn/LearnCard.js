import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import { IconButton } from "react-native-paper";
import { Header } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { increaseCardPointInCardSet } from "../../actions/CardSet";

import GetCard from "./GetCard";
import Test from "./Test";
import Remind from "./Remind";
import MultiChoiceScreen from "./MultiChoiceScreen";
function LearnCard(props) {
  const [index, setIndex] = useState(0);
  const [cardList, setCardList] = useState([]);
  const [status, setStatus] = useState("loading");
  const _flatListFlipCard = React.createRef();
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
  const handleAnswer = (isAnswer) => {
    console.log(isAnswer);
    if (isAnswer) {
      setIndex(index + 1);
      console.log(index);
      _flatListFlipCard.current.scrollToIndex({
        animated: true,
        index: index,
        viewPosition: 0.5,
      });
    }
  };
  const renderItem = useCallback(({ index, item }) => (
    <View style={styles.content}>
      <MultiChoiceScreen
        cardSet={props.cardSet}
        currentCardIndex={index}
        handleAnswer={(isAnswer) => handleAnswer(isAnswer)}
      />
    </View>
  ));
  const keyExtractor = useCallback((item, index) => index.toString());
  const _viewabilityConfig = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
    waitForInteraction: true,
  });
  return (
    <View style={styles.container}>
      <MyHeader
        title="LEARN"
        leftPress={() => props.navigation.pop()}
        rightPress={() => console.log("Pressed right")}
      />

      {/* {if (status == "loading") <Loading />} */}
      {status != "loading" && (
        <FlatList
          ref={_flatListFlipCard}
          data={cardList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          horizontal
          showsHorizontalScrollIndicator={false}
          viewabilityConfig={_viewabilityConfig.current}
        />
      )}
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
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    width: width,
    height: height,
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
