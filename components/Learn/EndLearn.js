import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProgressCircle from "react-native-progress/Circle";
function EndLearn({ total, correct, onPress }) {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    setProgress(correct / total);
  }, []);
  return (
    <View style={styles.container}>
      <ProgressCircle
        showsText={true}
        size={150}
        progress={progress}
        thickness={8}
        borderWidth={2}
        color="#7098DA"
      />
      <Text style={styles.textHeader}>Progress</Text>
      <Text
        style={[styles.text, { color: progress > 0.5 ? "#27AE60" : "#FFC30C" }]}
      >
        {progress > 0.5 ? "Great!" : "Keep trying!"}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
  textHeader: {
    fontSize: 14,
    letterSpacing: 0.5,
    textAlign: "center",
    fontWeight: "bold",
    color: "#7098DA",
    marginTop: 5,
    textTransform: "uppercase",
  },
  text: {
    fontSize: 20,
    letterSpacing: 0.5,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFC30C",
    marginTop: 20,
    textTransform: "uppercase",
  },
  icon: {
    width: 90,
    height: 90,
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 60,
    backgroundColor: "#FFDB6C",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#fff",
  },
});
export default EndLearn;
