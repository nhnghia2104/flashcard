import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPreset,
} from "@react-navigation/stack";
import { View, Text, Image } from "react-native";
import HomeScreen from "./HomeScreen";
import DetailsScreen, { height } from "../Details/DetailsScreen";
import PushNewCardScreen from "../Details/PushNewCardScreen";
import EditCardScreen from "../Details/EditCardScreen";

const HomeStack = createStackNavigator();
import { enableScreens } from "react-native-screens";
enableScreens();
function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
      <HomeStack.Screen
        name="PushCard"
        component={PushNewCardScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <HomeStack.Screen
        name="EditCardSet"
        component={EditCardScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
