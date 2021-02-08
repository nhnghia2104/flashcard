import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  TextInput,
} from "react-native";
const EditNameArea = ({ name, changeName }) => {
  const [editName, setEditName] = useState(false);
  const [textEdit, setTextEdit] = useState("");
  useEffect(() => {
    setTextEdit(name);

    return () => {};
  }, []);
  const endEditName = () => {
    changeName(textEdit);
    // console.log(textEdit);
    setEditName(false);
  };
  if (!editName) {
    return (
      <TouchableOpacity
        style={[styles.editNameGroup]}
        onPress={() => setEditName(true)}
      >
        <Text numberOfLines={1} style={[styles.setCardName]}>
          {textEdit}
        </Text>
        <Image
          style={styles.editNameIcon}
          source={require("../../assets/icon/edit/edit.png")}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={[styles.editNameGroup]}>
        <TextInput
          style={styles.textInputStyle}
          onEndEditing={endEditName}
          onChangeText={(text) => setTextEdit(text)}
          placeholder={"term, question,..."}
          autoFocus
          defaultValue={textEdit}
        />
      </View>
    );
  }
};

export default EditNameArea;

const styles = StyleSheet.create({
  editNameGroup: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  editNameIcon: {
    height: 20,
    width: 20,
    tintColor: "#4f4f4f",
    marginHorizontal: 10,
  },
  setCardName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    maxWidth: "90%",
  },
  textInputStyle: {
    height: 40,
    flex: 1,
    borderBottomColor: "#4F4F4F",
    borderBottomWidth: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
    textAlignVertical: "top",
  },
});
