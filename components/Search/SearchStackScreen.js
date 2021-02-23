import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPreset,
} from "@react-navigation/stack";
import { View, Text, Image } from "react-native";
import SearchScreen from "./SearchScreen";
import DetailsScreen, { height } from "../Details/DetailsScreen";
import PushNewCardScreen from "../Details/PushNewCardScreen";
import EditCardScreen from "../Details/EditCardScreen";

const SearchStack = createStackNavigator();
// import { enableScreens } from "react-native-screens";
// enableScreens();
function SearchStackScreen({ navigation }) {
  return (
    <SearchStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SearchStack.Screen
        name="Home"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        name="PushCard"
        component={PushNewCardScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <SearchStack.Screen
        name="EditCardSet"
        component={EditCardScreen}
        options={{
          headerShown: false,
        }}
      />
    </SearchStack.Navigator>
  );
}

export default SearchStackScreen;
