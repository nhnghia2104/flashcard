import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SearchBar, Header } from "react-native-elements";
import { connect } from "react-redux";
import Loading from "../Loading";
function SearchScreen(props) {
  const [text, setText] = useState("");
  const [searching, setSearching] = useState(false);
  const [arrayResult, setArrayResult] = useState([]);
  const updateSearch = (search) => {
    setText(search);
  };
  const startSearch = () => {
    if (props.arrayCard && text != "") {
      var dataFilter = props.arrayCard.filter(function (card) {
        return card.name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
      });
      setArrayResult(dataFilter);
    } else {
      setArrayResult([]);
    }
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.push("Details", { idCardSet: item.id })}
      >
        <View style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDes}>
              {item.cards.length} {item.cards.length > 1 ? "cards" : "card"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Header backgroundColor="#7098da" containerStyle={styles.header} />
      <SearchBar
        placeholder="Search..."
        onChangeText={updateSearch}
        value={text}
        platform="android"
        inputContainerStyle={{ backgroundColor: "#E0E0E0" }}
        inputStyle={{ fontSize: 16 }}
        containerStyle={{ backgroundColor: "#f2f2f2", paddingTop: 0 }}
        onEndEditing={startSearch}
        showLoading={true}
      />
      <FlatList
        // ListHeaderComponent={
        //   <>
        //     <Text style={styles.textHeaderFlatList}>Result</Text>
        //     {searching && <Loading />}
        //   </>
        // }
        data={arrayResult}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    borderBottomColor: "#7098da",
    borderBottomWidth: 0,
    zIndex: 1000,
  },
  textHeaderFlatList: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#4f4f4f",
  },
  flatList: {
    paddingBottom: 20,
    paddingTop: 0,
    backgroundColor: "#f2f2f2",
  },
  card: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    minHeight: 100,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
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
});
const selector = (store, props) => {
  return {
    arrayCard: store.card.data,
  };
};
export default connect(selector)(SearchScreen);
