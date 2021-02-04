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
} from "react-native";
import { Header, Input } from "react-native-elements";
import { IconButton } from "react-native-paper";
import { updateCardSetInfo } from "../../actions/CardSet";

const DissmissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
function EditCardScreen(props) {
  const [listCard, updateListCard] = useState([]);
  const [title, updateTitle] = useState("");
  useEffect(() => {
    if (props.cardSet) {
      const tempArr = [...props.cardSet.cards];
      updateListCard(tempArr);
      updateTitle(props.cardSet.name);
      console.log(props.cardSet.cards[0].data.front.text);
    }
    return () => {
      console.log(props.cardSet.cards[0].data.front.text);
    };
  }, []);
  const handleSubmit = () => {
    if (title != "") {
      props.dispatch(updateCardSetInfo(props.cardSet.id, listCard, title));
      props.navigation.pop();
    }
  };
  const updateFront = (index, text) => {
    const newArr = [...props.cardSet.cards];
    if (newArr[index]) {
      newArr[index].data.front.text = text;
      updateListCard(newArr);
    }
  };
  const updateBack = (index, text) => {
    var newArr = [...props.cardSet.cards];
    if (newArr[index]) {
      newArr[index].data.back.text = text;
      updateListCard(newArr);
    }
  };
  const renderItem = useCallback(
    ({ item, index }) => (
      <View style={[styles.viewInput]}>
        <Text style={styles.labelForInput}>frontside</Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => updateFront(index, text)}
          defaultValue={item.data.front.text}
        />
        <Text style={styles.labelForInput}>backside</Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => updateBack(index, text)}
          defaultValue={item.data.back.text}
        />
      </View>
    ),
    []
  );
  const keyExtractor = useCallback((item, index) => index.toString());

  return (
    <DissmissKeyboard>
      <View style={[styles.container]}>
        <Header
          barStyle="dark-content"
          backgroundColor="#fff"
          containerStyle={{
            borderBottomColor: "#368cfc",
            borderBottomWidth: 0,
            zIndex: 1000,
          }}
          leftComponent={() => (
            <IconButton
              color="#368cfc"
              icon={require("../../assets/icon/ios_back/ios_back.png")}
              onPress={() => props.navigation.pop()}
            />
          )}
          centerComponent={() => (
            <Text
              numberOfLines={1}
              style={{
                textAlign: "center",
                color: "#368cfc",
                fontSize: 16,
                height: "100%",
                textAlignVertical: "center",
                flex: 1,
              }}
            >
              SET
            </Text>
          )}
          rightComponent={() => (
            <IconButton
              color="#368cfc"
              icon={require("../../assets/icon/more_hor/more_hor.png")}
              onPress={handleSubmit}
            />
          )}
        />
        {props.cardSet.cards && (
          <FlatList
            data={props.cardSet.cards}
            renderItem={({ item, index }) => renderItem({ item, index })}
            keyExtractor={keyExtractor}
            style={styles.flatList}
            removeClippedSubviews={true}
            disableVirtualization={true}
            ListHeaderComponent={
              <View style={{ marginRight: 20, marginLeft: 20 }}>
                <Text style={styles.labelForInput}>title</Text>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={(text) => updateTitle(text)}
                  defaultValue={props.cardSet.name}
                />
              </View>
            }
          />
        )}
      </View>
    </DissmissKeyboard>
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
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
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
    color: "#4F4F4F",
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
  return {
    cardSet: store.data.find((x) => x.id === id), // finding card set in list card set by id
  };
};

export default connect(selectFromStore)(EditCardScreen);
