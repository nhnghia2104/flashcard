import React, { useState, useEffect, useCallback, useRef } from "react";
import { Header, Button } from "react-native-elements";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";
import FlipCard from "react-native-flip-card";
import { connect } from "react-redux";
import { IconButton } from "react-native-paper";
function ZoomScreen(props) {
  const [loaded, setLoaded] = useState(false);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  useEffect(() => {
    setTimeout(() => setLoaded(true), 0);
  });
  const renderItem = useCallback(
    ({ item, index }) => <FlipCardItem item={item} index={index} />,
    []
  );
  const keyExtractor = useCallback((item, index) => index.toString());
  return (
    <View style={styles.container}>
      <Header
        barStyle="dark-content"
        backgroundColor="#F2F2F2"
        containerStyle={{
          borderBottomColor: "#F2F2F2",
          borderBottomWidth: 0,
          zIndex: 1000,
        }}
        leftComponent={() => (
          <IconButton
            color="#4F4F4F"
            icon={require("../../assets/icon/close/close.png")}
            onPress={() => props.navigation.pop()}
          />
        )}
        centerComponent={() => (
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              flex: 1,
            }}
          >
            <Ticker scrollX={scrollX} data={props.cardSet.cards} />
          </View>
        )}
        rightComponent={() => (
          <IconButton
            color="#4F4F4F"
            icon={require("../../assets/icon/more_hor/more_hor.png")}
            onPress={() => console.log("pressed right")}
          />
        )}
      />
      {!loaded && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#02c39a" />
        </View>
      )}
      {loaded && props.cardSet && (
        <Animated.FlatList
          data={props.cardSet.cards}
          renderItem={({ item, index }) => renderItem({ item, index })}
          keyExtractor={keyExtractor}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        />
      )}
    </View>
  );
}
const { width, height } = Dimensions.get("window");
const TICKER_HEIGHT = 20;
const FlipCardItem = ({ item, index }) => {
  return (
    <View style={[styles.child]}>
      <FlipCard
        friction={6}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={false}
        clickable={true}
      >
        {/* Face Side */}
        <View style={[styles.card, { flex: 1, backgroundColor: "#fff" }]}>
          <Text style={styles.textBlack}>{item.data.front.text}</Text>
        </View>
        {/* Back Side */}
        <View style={[styles.card, { flex: 1, backgroundColor: "#fff" }]}>
          <Text style={styles.textBlack}>{item.data.back.text}</Text>
        </View>
      </FlipCard>
    </View>
  );
};
const Ticker = ({ scrollX, data, opacity }) => {
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  });
  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{ transform: [{ translateY }], opacity }}>
        {data.map(({ id }, index) => {
          return (
            <Text key={index} style={styles.tickerText}>
              {index + 1}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};
const selectFromStore = (store, props) => {
  let id = "1611681227828"; // props.route.params.idCardSet;
  return {
    cardSet: store.data.find((x) => x.id === id), // finding card set in list card set by id
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  child: {
    height: "auto",
    width: width,
    justifyContent: "center",
    alignContent: "center",
    // backgroundColor: "#000",
    padding: 20,
    borderRadius: 3,
    flex: 1,
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
  textBlack: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "600",
  },
  tickerContainer: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    textAlignVertical: "center",
    height: TICKER_HEIGHT,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
  },
  tickerText: {
    fontSize: 16,
    lineHeight: TICKER_HEIGHT,
    height: TICKER_HEIGHT,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    textAlignVertical: "center",
    color: "#4F4F4F",
  },
});

export default connect(selectFromStore)(ZoomScreen);
