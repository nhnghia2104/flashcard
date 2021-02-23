import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Header } from "react-native-elements";
import { IconButton } from "react-native-paper";
var data = [
  {
    title: "Quiz App",
    body: "Your Quiz has submitted Successfully.",
  },
  {
    title: "Hi !",
    body: "Demo abc",
  },
];
function NotificationScreen(props) {
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Image
          style={styles.icon}
          source={require("../assets/icon/bell/bell.png")}
        />
        <View>
          <Text style={styles.textTitle}>{item.title}</Text>
          <Text style={styles.textBody} numberOfLines={1}>
            {item.body}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <MyHeader title="Notification" leftPress={() => props.navigation.pop()} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
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
          icon={require("../assets/icon/close/close.png")}
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
  headerText: {
    textAlign: "center",
    color: "#4f4f4f",
    fontSize: 16,
    height: "100%",
    textAlignVertical: "center",
    flex: 1,
  },
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomColor: "#4f4f4f",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    tintColor: "#4f4f4f",
    marginRight: 20,
    width: 30,
    height: 30,
  },
  textTitle: { fontSize: 16, color: "#333333", fontWeight: "bold" },
  textBody: {
    fontSize: 14,
    color: "#4f4f4f",
    maxWidth: 250,
  },
});
export default NotificationScreen;
