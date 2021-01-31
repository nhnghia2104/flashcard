import React from "react";
import { render } from "react-dom";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { Header, Button } from "react-native-elements";
import SwiperFlatList from "react-native-swiper-flatlist";
import { connect } from "react-redux";
import { updateCardSetLastAccess } from "../actions/CardSet";
import { IconButton } from "react-native-paper";
import type { CardSet } from "../model/CardSet";
import FlipCard from "react-native-flip-card";
import ProgressBar from "react-native-progress/Bar";
@connect((store) => {
    return {
      setCards: store.data,
    };
  })
function CopyDetail(props) {
  return (<FlatList
  data={this.state.fetched ? this.state.cardSet.cards : []}
  renderItem={this.renderFlipCard}
  keyExtractor={(item, index) => index.toString()}
  onChangeIndex={(index) =>
    this.setState({ currentIndexCard: index.index })
  }
  ref={(ref) => {
    this._swiper = ref;
  }}
  horizontal
  showsHorizontalScrollIndicator={false}
  pagingEnabled
  />);
}

export default CopyDetail;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
    // alignItems: "center",
  },
  backGroundView: {
    backgroundColor: "#368cfc",
    width: width,
    height: (height * 0.35) / 2,
    position: "absolute",
  },
  child: {
    height: height * 0.35,
    width: width,
    justifyContent: "center",
    padding: 20,
    paddingTop: 0,
    borderRadius: 3,
  },
  text: {
    fontSize: width * 0.5,
    textAlign: "center",
  },
  card: {
    padding: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  buttonContainer: {
    // elevation: 8,
    backgroundColor: "#368cfc",
    borderRadius: 5,
    width: 150,
    // margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: 110,
  },

  item: {
    backgroundColor: "#fff",
    margin: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: "gray",
    borderBottomWidth: 0.5,
  },
  textTerm: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  textDefinition: {
    color: "#4F4F4F",
    fontSize: 15,
  },
});
