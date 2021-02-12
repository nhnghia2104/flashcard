import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Header, Input } from "react-native-elements";
import { IconButton } from "react-native-paper";
import { updateCardInCardSet } from "../../actions/CardSet";

function EditCardScreen(props) {
  const [index, setIndex] = useState(0);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [card, updateCard] = useState(null);
  useEffect(() => {
    var index = props.route.params.index;
    setIndex(index);
    updateCard(props.card);
    console.log(props.card);
    return () => {};
  }, []);
  const handleSubmit = () => {
    let idCardSet = props.route.params.idCardSet;
    let index = props.route.params.index;
    props.dispatch(updateCardInCardSet(idCardSet, card, index));
    props.navigation.pop();
  };
  const cardValueChanged = (text, isFront) => {
    let temp = { ...card };
    if (isFront) {
      temp.data.front.text = text;
    } else {
      temp.data.back.text = text;
    }
    updateCard(temp);
    console.log(card);
  };
  return (
    <ScrollView style={styles.container}>
      {card != null && (
        <View style={styles.container}>
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
                onPress={() => props.navigation.pop()}
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
                EDIT
              </Text>
            )}
            rightComponent={() => (
              <TouchableOpacity
                style={{ flex: 1, marginRight: 12 }}
                onPress={handleSubmit}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    height: "100%",
                    fontWeight: "bold",
                    textAlignVertical: "center",
                    flex: 1,
                  }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            )}
          />
          <View style={styles.viewInput}>
            <Text style={styles.labelForInput}>frontside</Text>
            <TextInput
              multiline
              numberOfLines={4}
              style={styles.textInputStyle}
              onChangeText={(text) => cardValueChanged(text, true)}
              placeholder={"term, question,..."}
              defaultValue={card.data.front.text}
            />
            <Text style={styles.labelForInput}>backside</Text>
            <TextInput
              multiline
              numberOfLines={4}
              style={styles.textInputStyle}
              onChangeText={(text) => cardValueChanged(text, false)}
              placeholder={"definition, answer,..."}
              defaultValue={card.data.back.text}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flatList: {
    backgroundColor: "#fff",
    // overflow: "visible",
  },
  viewInput: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  labelForInput: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#828282",
    textTransform: "capitalize",
  },
  textInputStyle: {
    borderBottomColor: "#828282",
    borderBottomWidth: 1,
    fontSize: 16,
    marginBottom: 20,
    textAlignVertical: "top",
  },
});
const selectFromStore = (store, props) => {
  let id = props.route.params.idCardSet;
  let cardSet = store.card.data.find((x) => x.id === id);
  let index = props.route.params.index;
  let cards = cardSet.cards;
  return {
    cardSet: cardSet,
    card: cards[index],
    index: index,
  };
};

export default connect(selectFromStore)(EditCardScreen);
