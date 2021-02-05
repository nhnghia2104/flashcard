import React, { useCallback, useEffect, useState, useRef } from "react";
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
  Image,
  ActivityIndicator,
} from "react-native";
import { Header, Button } from "react-native-elements";
import { connect } from "react-redux";
import {
  updateCardSetLastAccess,
  updateCardSetLastIndex,
  removeCardInCardSet,
} from "../../actions/CardSet";
import { IconButton } from "react-native-paper";
import type { CardSet } from "../../model/CardSet";
import FlipCard from "react-native-flip-card";
import ProgressBar from "react-native-progress/Bar";
import * as Animatable from "react-native-animatable";
import Swipeable from "react-native-gesture-handler/Swipeable";
type Props = {
  navigator: any,
  dispatch: any,
  route: any,
  setCards: Array<CardSet>,
};

const DetailsScreen = (props) => {
  var lastIndex = 0;
  const [loaded, setLoaded] = useState(false);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const slideDown = React.useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (props.cardSet) {
      props.dispatch(updateCardSetLastAccess(props.cardSet.id));
    }
    setTimeout(() => setLoaded(true), 0);
    return () => {};
  }, []);
  const renderItem = useCallback(
    ({ item, index, scrollX }) => (
      <FlipCardItem item={item} index={index} scrollX={scrollX} />
    ),
    []
  );
  const keyExtractorFlipCardItem = useCallback((item, index) =>
    index.toString()
  );

  const renderListCard = useCallback(({ item, index }) => (
    <CardItem item={item} index={index} props={props} />
  ));
  const keyExtractorListCardItem = useCallback((item, index) =>
    index.toString()
  );

  const onLayoutFlipCard = () => {
    Animated.timing(slideDown, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const translateYFlipCard = slideDown.interpolate({
    inputRange: [0, 1],
    outputRange: [-height * 0.35, 0],
  });

  return (
    <View style={styles.container}>
      <Header
        barStyle="light-content"
        backgroundColor="#02c39a"
        containerStyle={{
          borderBottomColor: "#02c39a",
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
            SET
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
      {!loaded && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#02c39a" />
        </View>
      )}
      {loaded && props.cardSet && (
        <FlatList
          ListHeaderComponent={
            <View>
              {loaded && props.cardSet && (
                <Animated.View
                  onLayout={onLayoutFlipCard}
                  style={[
                    {
                      translateY: translateYFlipCard,
                    },
                  ]}
                >
                  {props.cardSet.cards.length != 0 && (
                    <View style={styles.backGroundView}></View>
                  )}
                  <Animated.FlatList
                    style={styles.flatListCard}
                    data={props.cardSet.cards}
                    renderItem={({ item, index }) =>
                      renderItem({ item, index, scrollX })
                    }
                    initialNumToRender={0}
                    maxToRenderPerBatch={1}
                    removeClippedSubviews={true}
                    disableVirtualization={true}
                    keyExtractor={keyExtractorFlipCardItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                      { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                  />
                  <Ticker
                    opacity={slideDown}
                    scrollX={scrollX}
                    data={props.cardSet.cards}
                  />
                </Animated.View>
              )}
              <Animated.View
                style={[styles.actionGroup, { translateY: translateYFlipCard }]}
              >
                <TouchableOpacity
                  style={[styles.buttonContainer]}
                  onPress={() =>
                    props.navigation.push("PushCard", {
                      idCardSet: props.cardSet.id,
                    })
                  }
                >
                  <Image
                    style={styles.icon}
                    source={require("../../assets/icon/stack/stack.png")}
                  />
                  <Text style={[styles.buttonText]}>Add new card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonContainer]}
                  onPress={() =>
                    props.navigation.push("EditCardSet", {
                      idCardSet: props.cardSet.id,
                    })
                  }
                >
                  <Image
                    style={styles.icon}
                    source={require("../../assets/icon/learn/learn.png")}
                  />
                  <Text style={[styles.buttonText]}>Learn</Text>
                </TouchableOpacity>
              </Animated.View>
              <Text style={styles.textHeaderList}>
                Card in this set ({props.cardSet.cards.length})
              </Text>
            </View>
          }
          data={props.cardSet.cards}
          renderItem={({ item, index }) => renderListCard({ item, index })}
          keyExtractor={keyExtractorListCardItem}
          // initialNumToRender={3}
          // maxToRenderPerBatch={1}
          removeClippedSubviews={true}
          disableVirtualization={true}
        />
      )}
    </View>
  );
};

const { width, height } = Dimensions.get("window");
const TICKER_HEIGHT = 20;

const CardItem = ({ item, index, props }) => {
  const _swipe = useRef(null);

  const removeAction = (index) => {
    _swipe.current.close();
    props.dispatch(removeCardInCardSet(props.cardSet.id, index));
  };
  const swipeAction = (index) => {
    return (
      <TouchableOpacity onPress={() => removeAction(index)}>
        <View style={styles.deleteBox}>
          <Image
            source={require("../../assets/icon/delete/delete.png")}
            style={{ tintColor: "#fff", width: 28, height: 28 }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.push("EditCardSet", {
          idCardSet: props.cardSet.id,
          index: index,
        })
      }
      activeOpacity={1}
    >
      <Swipeable
        overshootRight={false}
        renderRightActions={() => swipeAction(index)}
        ref={_swipe}
      >
        <View style={styles.item}>
          <Text style={styles.textTerm}>{item.data.front.text}</Text>
          <Text style={styles.textDefinition}>{item.data.back.text}</Text>
        </View>
      </Swipeable>
    </TouchableOpacity>
  );
};
const FlipCardItem = ({ item, index, scrollX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const inputRangeOpacity = [
    (index - 0.3) * width,
    index * width,
    (index + 0.3) * width,
  ];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.5, 1, 0.5],
  });
  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [0.8, 1, 0.8],
  });
  return (
    <Animated.View style={[styles.child, { transform: [{ scale }] }]}>
      <FlipCard
        friction={6}
        perspective={1000}
        flipHorizontal={false}
        flipVertical={true}
        flip={false}
        clickable={true}
        onFlipEnd={(isFlipEnd) => {
          console.log("isFlipEnd", isFlipEnd);
        }}
      >
        {/* Face Side */}
        <View style={[styles.card, { flex: 1, backgroundColor: "#fff" }]}>
          <Text style={styles.textBlack}>{item.data.front.text}</Text>
          <IconButton
            onPress={() => console.log("front")}
            color="#02c39a"
            style={styles.buttonZoom}
            icon={require("../../assets/icon/zoom/zoom.png")}
          />
        </View>
        {/* Back Side */}
        <View style={[styles.card, { flex: 1, backgroundColor: "#fff" }]}>
          <Text style={styles.textBlack}>{item.data.back.text}</Text>
          <IconButton
            onPress={() => console.log("back")}
            color="#02c39a"
            style={styles.buttonZoom}
            icon={require("../../assets/icon/zoom/zoom.png")}
          />
        </View>
      </FlipCard>
    </Animated.View>
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
    backgroundColor: "#fff",
    flex: 1,
  },
  backGroundView: {
    backgroundColor: "#02c39a",
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
  flipCardArea: {
    minHeight: height * 0.35,
    width: width,
  },
  textNumberCard: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginTop: 15,
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
    fontSize: 14,
    color: "#333333",
    alignSelf: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    marginHorizontal: "auto",
    borderBottomWidth: 5,
    borderColor: "#F0F3BD",
    width: "47%",
    // flex: 1,
  },
  actionGroup: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flatListCard: {
    paddingBottom: 10,
  },
  textBlack: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "600",
  },
  item: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: "gray",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
  },
  textTerm: {
    color: "#333333",
    fontSize: 15,
    // fontWeight: "700",
    marginBottom: 8,
  },
  textDefinition: {
    color: "#4F4F4F",
    fontSize: 15,
  },
  tickerContainer: {
    height: TICKER_HEIGHT,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
    color: "#02c39a",
  },
  buttonZoom: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },

  textHeaderList: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "bold",
    margin: 20,
    marginBottom: 15,
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
  deleteBox: {
    backgroundColor: "#e01e37",
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: "#02C39A",
    marginBottom: 5,
  },
});

const selectFromStore = (store, props) => {
  let id = props.route.params.idCardSet;
  return {
    cardSet: store.data.find((x) => x.id === id), // finding card set in list card set by id
  };
};

export default connect(selectFromStore)(DetailsScreen);
