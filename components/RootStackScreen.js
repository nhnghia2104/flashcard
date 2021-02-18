// import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPreset,
} from "@react-navigation/stack";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "../store";
import MainAppTabs from "./MainAppTabs";
import AddNewCardSetScreen from "./AddNewCardSetScreen";
import ZoomScreen from "./Details/ZoomScreen";
import LearnCard from "./Learn/LearnCard";
const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();
function RootStackScreen(props) {
  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar translucent={true} barStyle="light-content" />
        <NavigationContainer>
          <RootStack.Navigator
            headerMode="none"
            screenOptions={{ animationEnabled: false }}
          >
            <RootStack.Screen name="MainAppTabs" component={MainAppTabs} />
            <RootStack.Screen
              name="AddNewCardSet"
              component={AddNewCardSetScreen}
              options={{ animationEnabled: true }}
            />
            <RootStack.Screen
              name="ZoomScreen"
              component={ZoomScreen}
              options={{ animationEnabled: true }}
            />
            <RootStack.Screen
              name="LearnCard"
              component={LearnCard}
              options={{ animationEnabled: true }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default RootStackScreen;
