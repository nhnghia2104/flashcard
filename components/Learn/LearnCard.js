import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { IconButton } from "react-native-paper";
import { Header, Overlay } from "react-native-elements";
import { connect } from "react-redux";
import { updatePointForListCard } from "../../actions/CardSet";
import ProgressBar from "react-native-progress/Bar";
import MultiChoice from "./MultiChoice";
import Loading from "../Loading";
import StartLearn from "./StartLearn";
import EndLearn from "./EndLearn";
function LearnCard(props) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cardList, setCardList] = useState([]);
  const [status, setStatus] = useState("loading");
  const [modalCorrectVisible, setModalCorrectVisible] = useState(false);
  const [modalIncorrectVisible, setModalIncorrectVisible] = useState(false);
  const [incorrectInfo, setIncorrectInfo] = useState({
    question: "",
    correctAnswer: "",
    picked: "",
  });
  const [flatList, setFlatList] = useState(null);
  const [listCardCorrect, setListCardCorrect] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (props.cardSet) {
      var card = props.cardSet.cards.filter(checkPoint).slice(0, 5);
      console.log(card);
      if (!card.length) {
        console.log("non");
      } else {
        card.push(...card);
        setCardList(card);
        setStatus("end");
      }
    }
    setModalIncorrectVisible(false);
    setModalCorrectVisible(false);
  }, []);
  function checkPoint(card) {
    return card.point < 3;
  }
  const handleAnswer = (isAnswer, index) => {
    if (isAnswer) {
      setModalCorrectVisible(true);
      setTimeout(function () {
        goNext();
      }, 1000);
      setListCardCorrect((old) => [...old, index]);
      console.log(listCardCorrect);
    } else {
      setIncorrectInfo({
        question: cardList[currentCardIndex].data.front.text,
        correctAnswer: cardList[currentCardIndex].data.back.text,
        picked: props.cardSet.cards[index].data.back.text,
      });
      setModalIncorrectVisible(true);
    }
  };

  const goNext = () => {
    setModalCorrectVisible(false);
    setModalIncorrectVisible(false);
    setProgress((currentCardIndex + 1) / cardList.length);
    if (canGoNext()) {
      flatList.scrollToIndex({
        animated: true,
        index: currentCardIndex + 1,
        viewPosition: 0.5,
      });
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setStatus("end");
    }
  };
  const canGoNext = () => {
    return currentCardIndex < cardList.length - 1;
  };
  const popScreen = () => {
    if (listCardCorrect.length && cardList.length) {
      if (status != "end") {
        setStatus("end");
      }
      props.dispatch(updatePointForListCard(props.cardSet.id, listCardCorrect));
    }

    props.navigation.pop();
  };
  const renderItem = useCallback(({ index, item }) => {
    return (
      <View style={styles.content}>
        <MultiChoice
          cardSet={props.cardSet}
          currentCardIndex={props.cardSet.cards.indexOf(item)}
          handleAnswer={(isAnswer, index) => handleAnswer(isAnswer, index)}
        />
      </View>
    );
  });
  const keyExtractor = useCallback((item, index) => index.toString());
  const _viewabilityConfig = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
    waitForInteraction: true,
  });
  return (
    <View style={styles.container}>
      <MyHeader
        title="LEARN"
        leftPress={popScreen}
        rightPress={() => console.log("Pressed right")}
      />
      <ProgressBar
        style={{ width: "100%", borderRadius: 0 }}
        progress={progress}
        borderWidth={0}
        useNativeDriver={true}
        width={null}
        color="#27AE60"
      />

      {status == "loading" && <Loading />}
      {status == "start" && <StartLearn onPress={() => setStatus("learn")} />}
      {status == "learn" && (
        <FlatList
          ref={(ref) => setFlatList(ref)}
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
          pagingEnabled
          initialNumToRender={1}
          scrollEnabled={false}
        />
      )}
      {status == "end" && (
        <EndLearn total={cardList.length} correct={listCardCorrect.length} />
      )}
      <ModalCorrect visible={modalCorrectVisible} />
      <ModalIncorrect
        visible={modalIncorrectVisible}
        data={incorrectInfo}
        onPress={goNext}
      />
    </View>
  );
}

const MyHeader = ({ leftPress, rightPress, title }) => {
  return (
    <Header
      barStyle="dark-content"
      backgroundColor="#fff"
      containerStyle={styles.headerContainer}
      leftComponent={() => (
        <IconButton
          color="#4f4f4f"
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
const ModalCorrect = ({ visible }) => {
  return (
    <Modal
      animationType="none"
      presentationStyle="overFullScreen"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            style={styles.icon}
            source={require("../../assets/icon/smile/smile.png")}
          />
          <Text style={[styles.modalText, styles.title, styles.correctColor]}>
            Correct !
          </Text>
        </View>
      </View>
    </Modal>
  );
};
const ModalIncorrect = ({ visible, data, onPress }) => {
  return (
    <Modal
      animationType="fade"
      presentationStyle="overFullScreen"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={styles.icon}
              source={require("../../assets/icon/confused/confused.png")}
            />
            <Text style={[styles.modalText, styles.dangerColor, styles.title]}>
              Oops...
            </Text>
          </View>
          <View style={styles.modalBody}>
            <Text style={[styles.modalText]}>{data.question}</Text>
            <Text style={[styles.modalText, styles.title, styles.correctColor]}>
              correct answer:
            </Text>
            <Text style={styles.modalText}>{data.correctAnswer}</Text>
            <View style={styles.break}></View>
            <Text style={[styles.modalText, styles.title, styles.dangerColor]}>
              Your answer was:
            </Text>
            <Text style={styles.modalText}>{data.picked}</Text>
          </View>
          <Pressable style={styles.modalButtonContainer} onPress={onPress}>
            <Text style={[styles.modalButtonText]}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
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

  headerText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    height: "100%",
    textAlignVertical: "center",
    flex: 1,
  },
  //
  icon: {
    // tintColor: "#fff",
    width: 60,
    height: 60,
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .5)",
  },
  modalHeader: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  correctBgColor: {
    backgroundColor: "#70DA7B",
  },
  correctColor: {
    color: "#27AE60",
  },
  dangerColor: {
    color: "#D75050",
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "88%",
    maxHeight: "100%",
    overflow: "scroll",
    padding: 20,
  },
  modalText: {
    color: "#333333",
    fontSize: 16,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  modalButtonContainer: {
    alignSelf: "stretch",
    paddingVertical: 15,
    backgroundColor: "#27AE60",
    marginTop: 10,
  },
  modalButtonText: {
    textAlign: "center",
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#fff",
  },
  modalBody: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
  },
  break: {
    alignSelf: "stretch",
    borderBottomWidth: 0.5,
    borderColor: "#4f4f4f",
    marginVertical: 8,
  },
});

const selector = (store, props) => {
  let id = props.route.params.idCardSet;
  return {
    cardSet: store.card.data.find((x) => x.id == id),
  };
};
export default connect(selector)(LearnCard);
