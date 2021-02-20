import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { Input } from "react-native-elements";
const EditNameArea = ({ name, changeName }) => {
  const [editName, setEditName] = useState(false);
  const [textEdit, setTextEdit] = useState("");
  useEffect(() => {
    setTextEdit(name);
    return () => {};
  }, []);
  const endEditName = () => {
    changeName(textEdit);
    setEditName(false);
  };
  if (!editName) {
    return (
      <TouchableOpacity
        style={[styles.editNameGroup]}
        onPress={() => setEditName(true)}
      >
        <Image
          style={styles.editNameIcon}
          source={require("../../assets/icon/edit/edit.png")}
        />
        <Text numberOfLines={1} style={[styles.setCardName]}>
          {textEdit}
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={[styles.editNameGroup]}>
        <Input
          style={styles.textInputStyle}
          onEndEditing={endEditName}
          onChangeText={(text) => setTextEdit(text)}
          placeholder={"term, question,..."}
          autoFocus
          defaultValue={textEdit}
          leftIcon={() => (
            <Image
              style={styles.editNameIcon}
              source={require("../../assets/icon/edit/edit.png")}
            />
          )}
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
    tintColor: "#6EB6FF",
    marginRight: 5,
  },
  setCardName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6EB6FF",
    maxWidth: "90%",
  },
  textInputStyle: {
    height: 40,
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#6EB6FF",
  },
});
