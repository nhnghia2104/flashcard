import React from "react";
import { Text, View, Image } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPreset,
} from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import DetailScreen from "./Details/DetailsScreen";
import AddNewCardSetScreen from "./AddNewCardSetScreen";
import HomeStackScreen from "./Home/HomeStackScreen";
import SearchStackScreen from "./Search/SearchStackScreen";
const Tab = createMaterialBottomTabNavigator();

function MainAppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      shifting={true}
      labeled={false}
      lazy={true}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        removeClippedSubviews={true}
        options={{
          tabBarColor: "#7098da",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/icon/home/home.png")}
              style={{
                tintColor: color,
                width: 26,
                height: 26,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddNewCardSetScreen}
        options={{
          tabBarLabel: "",
          tabBarColor: "#219653",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/icon/cardset_plus/cardset_plus.png")}
              style={{
                tintColor: color,
                width: 26,
                height: 26,
              }}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("AddNewCardSet");
          },
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarLabel: "",
          tabBarColor: "#6EB6FF",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/icon/search/search.png")}
              style={{
                tintColor: color,
                width: 26,
                height: 26,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainAppTabs;
