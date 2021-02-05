import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { Header } from "react-native-elements";
import { IconButton } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import {
  clearAllCardSet,
  getAllCardSet,
  addNewCardSet,
  deleteCardSet,
} from "../../actions/CardSet";
import { connect } from "react-redux";
import realm from "../../realm";
import type { CardSet } from "../../model/CardSet";
type Props = {
  navigator: any,
  dispatch: any,
  setCards: Array<CardSet>,
};
@connect((store) => {
  return {
    setCards: store.data,
  };
})
class HomeScreen extends Component {
  props: Props;
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    // this.props.dispatch(clearAllCardSet());
    this.props.dispatch(getAllCardSet());
  }
  componentDidUpdate() {}
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.push("Details", { idCardSet: item.id })
        }
      >
        <View style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDes}>
              {item.cards.length} {item.cards.length > 1 ? "cards" : "card"}
            </Text>
          </View>
          <View style={styles.cardButtonArea}>
            <IconButton
              icon={require("../../assets/icon/more_vert/more_vert_black.png")}
              color={"#4F4F4F"}
              size={24}
              onPress={() => this.props.dispatch(deleteCardSet(item.id))}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#368cfc"
          containerStyle={{
            borderBottomColor: "#368cfc",
            borderBottomWidth: 0,
            zIndex: 1000,
          }}
          centerComponent={() => (
            <Text numberOfLines={1} style={styles.headerTitleStyle}>
              Home
            </Text>
          )}
          rightComponent={() => (
            <IconButton
              color="#fff"
              icon={require("../../assets/icon/more_hor/more_hor.png")}
              onPress={() => console.log("pressed right")}
            />
          )}
        />
        <FlatList
          ListHeaderComponent={
            <>
              <Text
                style={{
                  marginTop: 20,
                  marginLeft: 20,
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#333333",
                }}
              >
                Sets
              </Text>
            </>
          }
          data={this.props.setCards.sort((a, b) => a.lastAccess < b.lastAccess)}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{
            paddingBottom: 20,
            paddingTop: 0,
            backgroundColor: "#fff",
          }}
        />
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerTitleStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    height: "100%",
    textAlignVertical: "center",
    flex: 1,
  },
  card: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    minHeight: 100,
    backgroundColor: "rgba(94, 84, 142, 0.1)",
    padding: 15,
    borderRadius: 3,
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 17,
    color: "#333333",
  },
  cardDes: {
    fontWeight: "400",
    fontSize: 16,
    color: "#4F4F4F",
    marginTop: 8,
  },
  cardButtonArea: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
