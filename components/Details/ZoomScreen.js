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
import { updateCardSetLastIndex } from "../../actions/CardSet";
import Loading from "../Loading";
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
  const _viewabilityConfig = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
    waitForInteraction: true,
  });
  const onViewCardRef = React.useRef(({ viewableItems }) => {
    console.log(viewableItems);
    if (viewableItems.length) {
      let index = viewableItems[0].index;
      let id = props.cardSet.id;

      props.dispatch(updateCardSetLastIndex(id, index));
    }
  });
  const keyExtractor = useCallback((item, index) => index.toString());
  return (
    <View style={styles.container}>
      <MyHeader
        data={props.cardSet.cards}
        scrollX={scrollX}
        leftPress={() => props.navigation.pop()}
        loaded={loaded}
      />
      {!loaded && <Loading />}
      {loaded && props.cardSet && (
        <Animated.FlatList
          data={props.cardSet.cards}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onViewableItemsChanged={onViewCardRef.current}
          viewabilityConfig={_viewabilityConfig.current}
          initialScrollIndex={props.cardSet.lastIndex}
          removeClippedSubviews={true}
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
const MyHeader = ({ data, leftPress, rightPress, scrollX, loaded }) => {
  return (
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
          onPress={leftPress}
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
          {loaded && <Ticker scrollX={scrollX} data={data} />}
        </View>
      )}
      rightComponent={() => (
        // <IconButton
        //   color="#4F4F4F"
        //   icon={require("../../assets/icon/more_hor/more_hor.png")}
        //   onPress={() => console.log("pressed right")}
        // />
        <View></View>
      )}
    />
  );
};
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
    paddingTop: 5,
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
    fontSize: 17,
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
const selectFromStore = (store, props) => {
  let id = props.route.params.idCardSet;
  return {
    cardSet: store.card.data.find((x) => x.id === id), // finding card set in list card set by id
  };
};

export default connect(selectFromStore)(ZoomScreen);
