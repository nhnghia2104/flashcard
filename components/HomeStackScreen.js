import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPreset,
} from "@react-navigation/stack";
import { View, Text, Image } from "react-native";
import HomeScreen from "./HomeScreen";
import DetailsScreen, { height } from "./DetailsScreen";
const HomeStack = createStackNavigator();

function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: {
          backgroundColor: "#368cfc",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
