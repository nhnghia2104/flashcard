import React from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet } from "react-native";
const ModalMessage = ({ visible, title, message, onPress }) => {
  return (
    <Modal
      animationType="fade"
      presentationStyle="overFullScreen"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}
    >
      <View style={styles.modalView}>
        <View style={styles.modalContainer}>
          <Text style={styles.textTitle}>{title ? title : "Message"}</Text>
          <Text style={styles.textMessage}>{message}</Text>
          <TouchableOpacity
            style={styles.modalButtonContainer}
            onPress={onPress}
          >
            <Text style={styles.modalButtonText}>OK, THANKS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "88%",
    maxHeight: "100%",
    overflow: "scroll",
    padding: 20,
  },
  textTitle: {
    fontSize: 16,
    color: "#4f4f4f",
    fontWeight: "bold",
    marginBottom: 8,
  },
  textMessage: {
    fontSize: 15,
    color: "#4f4f4f",
    marginBottom: 8,
  },
  modalButtonContainer: {
    alignSelf: "stretch",
    // backgroundColor: "#4f4f4f",
  },
  modalButtonText: {
    textAlign: "right",
    textTransform: "uppercase",
    fontSize: 16,
    color: "#3399ff",
  },
});
export default ModalMessage;
