import React, { useCallback } from "react";
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
import { connect } from "react-redux";
import { updateCardSetLastAccess } from "../actions/CardSet";
import { IconButton } from "react-native-paper";
import type { CardSet } from "../model/CardSet";
import FlipCard from "react-native-flip-card";
import ProgressBar from "react-native-progress/Bar";
type Props = {
  navigator: any,
  dispatch: any,
  route: any,
  setCards: Array<CardSet>,
};

class DetailsScreen extends React.Component {
  props: Props;
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    // this.fetchedData();
  }

  componentWillUnmount() {
    this.setState(null);
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        {/* Face Side */}
        <Text style={styles.textTerm}>{item.data.front.text}</Text>
        {/* Back Side */}
        <Text style={styles.textDefinition}>{item.data.back.text}</Text>
      </View>
    );
  };

  render() {
    const cardSetComponent = this.props.cardSet ? (
      // <FlatList
      //   data={this.props.cardSet.cards}
      //   renderItem={this.renderItem}
      //   keyExtractor={(item, index) => index.toString()}
      //   style={{
      //     paddingBottom: 20,
      //     paddingTop: 0,
      //     backgroundColor: "#fff",
      //   }}
      //   style={styles.container}
      // />
      <>
        <Header
          backgroundColor="#368cfc"
          containerStyle={{
            borderBottomColor: "#368cfc",
            borderBottomWidth: 0,
          }}
          leftComponent={() => (
            <IconButton
              color="#fff"
              icon={require("../assets/icon/ios_back/ios_back.png")}
              onPress={() => this.props.navigation.pop()}
            />
          )}
          centerComponent={() => (
            <Text
              numberOfLines={1}
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 17,
                height: "100%",
                textAlignVertical: "center",
                flex: 1,
              }}
            >
              {this.props.cardSet.name}
            </Text>
          )}
          rightComponent={() => (
            <IconButton
              color="#fff"
              icon={require("../assets/icon/more_hor/more_hor.png")}
              onPress={() => this.props.navigation.pop()}
            />
          )}
        />
        <View>
          <View style={styles.backGroundView}></View>
          <FlatListCard data={this.props.cardSet.cards} />
          <View style={styles.actionGroup}>
            <Button title="Add new cardcc" />
            <Button title="Add new card" />
          </View>
        </View>
      </>
    ) : (
      <Text>Tao đang load</Text>
    );
    return <View>{cardSetComponent}</View>;
  }
}

const { width, height } = Dimensions.get("window");
const TICKER_HEIGHT = 20;

const FlatListCard = ({ data }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const renderFlipCardItem = useCallback(
    ({ item, index, scrollX }) => (
      <FlipCardItem item={item} index={index} scrollX={scrollX} />
    ),
    []
  );
  const keyExtractorFlipCardItem = useCallback((item, index) =>
    index.toString()
  );
  return (
    <View>
      <Animated.FlatList
        style={styles.flatListCard}
        data={data}
        renderItem={({ item, index }) =>
          renderFlipCardItem({ item, index, scrollX })
        }
        keyExtractor={keyExtractorFlipCardItem}
        onChangeIndex={(index) =>
          this.setState({ currentIndexCard: index.index })
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
      <Ticker scrollX={scrollX} data={data} />
    </View>
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
          <Text>{item.data.front.text}</Text>
          <IconButton
            onPress={() => console.log("front")}
            color="#368cfc"
            style={styles.buttonZoom}
            icon={require("../assets/icon/zoom/zoom.png")}
          />
        </View>
        {/* Back Side */}
        <View style={[styles.card, { flex: 1, backgroundColor: "#fff" }]}>
          <Text>{item.data.back.text}</Text>
          <IconButton
            onPress={() => console.log("back")}
            color="#368cfc"
            style={styles.buttonZoom}
            icon={require("../assets/icon/zoom/zoom.png")}
          />
        </View>
      </FlipCard>
    </Animated.View>
  );
};

const Ticker = ({ scrollX, data }) => {
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  });
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
  });
  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
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
  textNumberCard: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginTop: 15,
  },
  card: {
    padding: 15,
    borderRadius: 8,
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
  flatListCard: {
    paddingBottom: TICKER_HEIGHT,
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
  tickerContainer: {
    height: TICKER_HEIGHT,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    // backgroundColor: "#000",
  },
  tickerText: {
    fontSize: 16,
    lineHeight: TICKER_HEIGHT,
    height: TICKER_HEIGHT,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    textAlignVertical: "center",
    color: "#368cfc",
    // backgroundColor: "#368cfc",
  },
  buttonZoom: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  actionGroup: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const selectFromStore = (store, props) => {
  let id = props.route.params.idCardSet;
  return {
    cardSet: store.data.find((x) => x.id == id),
  };
};

export default connect(selectFromStore)(DetailsScreen);
