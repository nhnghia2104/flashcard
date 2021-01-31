import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { addNewCardSet } from "../actions/CardSet";
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
class AddNewCardSetScreen extends React.Component {
  props: Props;
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }
  handleSubmit = () => {
    if (this.state.text != "") {
      this.props.dispatch(addNewCardSet(this.state.text));
      this.props.navigation.goBack();
    } else {
      this.props.navigation.goBack();
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Create new set card</Text>
        <View style={styles.viewInput}>
          <Text style={styles.labelForInput}>title</Text>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => this.setState({ text: text })}
            placeholder={"Subject, chapter, unit..."}
            defaultValue={this.state.text}
            autoFocus={true}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.buttonCancel]}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={[styles.buttonText, styles.buttonCancelText]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.buttonSubmit]}
            onPress={this.handleSubmit}
          >
            <Text style={[styles.buttonText, styles.buttonSubmitText]}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
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
    height: 40,
    borderBottomColor: "#4F4F4F",
    borderBottomWidth: 1,
    fontSize: 16,
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
});
export default AddNewCardSetScreen;
