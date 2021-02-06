import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { pushNewCard } from "../../actions/CardSet";
import FlipCard from "react-native-flip-card";
import { Header } from "react-native-elements";
import { IconButton } from "react-native-paper";
import { connect } from "react-redux";

type Props = {
  navigator: any,
  dispatch: any,
  setCards: Array<CardSet>,
};

const { width, height } = Dimensions.get("window");
const DissmissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
@connect((store) => {
  return {
    setCards: store.data,
  };
})
class PushNewCardScreen extends React.Component {
  props: Props;
  constructor(props) {
    super(props);
    this.state = {
      frontText: "",
      backText: "",
    };
    console.log(this.props.route.params.idCardSet);
  }
  handleSubmit = () => {
    if (this.state.frontText != "" && this.state.backText != "") {
      var id = this.props.route.params.idCardSet;
      var card = {
        id: Date.now().toString(),
        point: 0,
        data: {
          front: {
            text: this.state.frontText,
            imageURL: "",
          },
          back: {
            text: this.state.backText,
            imageURL: "",
          },
        },
      };
      this.props.dispatch(pushNewCard(id, card));
      this.props.navigation.goBack();
    } else {
      this.props.navigation.goBack();
    }
  };
  render() {
    return (
      <DissmissKeyboard>
        <ScrollView>
          <View style={styles.container}>
            <Header
              barStyle="light-content"
              backgroundColor="#02c39a"
              containerStyle={{
                borderBottomColor: "#fff",
                borderBottomWidth: 0,
                zIndex: 1000,
              }}
              leftComponent={() => (
                <IconButton
                  color="#fff"
                  icon={require("../../assets/icon/ios_back/ios_back.png")}
                  onPress={() => this.props.navigation.pop()}
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
                  ADD NEW CARD
                </Text>
              )}
              rightComponent={() => (
                <TouchableOpacity
                  style={{ flex: 1, marginRight: 12 }}
                  onPress={this.handleSubmit}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      height: "100%",
                      fontWeight: "bold",
                      textAlignVertical: "center",
                      flex: 1,
                    }}
                  >
                    Done
                  </Text>
                </TouchableOpacity>
              )}
            />
            <View style={styles.viewInput}>
              <Text style={styles.labelForInput}>frontside</Text>
              <TextInput
                multiline
                numberOfLines={4}
                style={styles.textInputStyle}
                onChangeText={(text) => this.setState({ frontText: text })}
                placeholder={"term, question,..."}
                defaultValue={this.state.text}
                // autoFocus={true}
              />
              <Text style={styles.labelForInput}>backside</Text>
              <TextInput
                multiline
                numberOfLines={4}
                style={styles.textInputStyle}
                onChangeText={(text) => this.setState({ backText: text })}
                placeholder={"definition, answer,..."}
                defaultValue={this.state.text}
              />
            </View>
            <Text style={{ marginBottom: 10, fontSize: 15 }}>Review</Text>
            <View style={styles.child}>
              <FlipCard
                friction={6}
                perspective={1000}
                flipHorizontal={false}
                flipVertical={true}
                flip={false}
                clickable={true}
              >
                {/* Face Side */}
                <View
                  style={[styles.card, { flex: 1, backgroundColor: "#fff" }]}
                >
                  <Text style={styles.textBlack}>{this.state.frontText}</Text>
                </View>
                {/* Back Side */}
                <View
                  style={[styles.card, { flex: 1, backgroundColor: "#fff" }]}
                >
                  <Text style={styles.textBlack}>{this.state.backText}</Text>
                </View>
              </FlipCard>
            </View>
          </View>
        </ScrollView>
      </DissmissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 17,
    textTransform: "uppercase",
    color: "#4F4F4F",
  },

  viewInput: {
    marginBottom: 20,
    marginTop: 20,
    width: "87%",
  },

  labelForInput: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4F4F4F",
    textTransform: "capitalize",
  },

  textInputStyle: {
    // height: 40,
    borderBottomColor: "#4F4F4F",
    borderBottomWidth: 1,
    fontSize: 16,
    marginBottom: 20,
    textAlignVertical: "top",
  },

  buttonText: {
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    // elevation: 8,
    backgroundColor: "#009688",
    // borderRadius: 5,
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: 110,
  },
  buttonCancelText: {
    color: "#4F4F4F",
  },
  buttonCancel: {
    backgroundColor: "#E5E5E5",
  },
  buttonSubmitText: {
    color: "#fff",
  },
  buttonSubmit: {
    backgroundColor: "#6FCF97",
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
  child: {
    height: height * 0.35,
    width: width,
    justifyContent: "center",
    padding: 20,
    paddingTop: 0,
    borderRadius: 3,
  },
});

export default PushNewCardScreen;
