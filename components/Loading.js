import { View, ActivityIndicator } from "react-native";
import React from "react";
function Loading(props) {
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" color="#7098da" />
    </View>
  );
}

export default Loading;
