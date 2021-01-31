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
import HomeScreen from "./HomeScreen";
import DetailScreen from "./DetailsScreen";
import AddNewCardSetScreen from "./AddNewCardSetScreen";
import HomeStackScreen from "./HomeStackScreen";
const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
function MainAppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      shifting={true}
      labeled={false}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarColor: "#368cfc",
          tabBarIcon: ({ color }) => (
            // <MaterialCommunityIcons name="home" color={color} size={26} />
            // <Icon name="ios-home" size={26} color={color}></Icon>
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
            // <MaterialCommunityIcons name="search" color={color} size={26} />
            <Icon name="ios-add" size={26} color={color}></Icon>
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
        name="Huhu"
        component={DetailStackScreen}
        options={{
          tabBarLabel: "",
          tabBarColor: "#219653",
          tabBarIcon: ({ color }) => (
            // <MaterialCommunityIcons name="search" color={color} size={26} />
            <Icon name="ios-search" size={26} color={color}></Icon>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainAppTabs;

const DetailStackScreen = ({ navigation }) => (
  <DetailStack.Navigator
    screenOptions={{
      gestureEnabled: true,
      gestureDirection: "horizontal",
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerStyle: {
        backgroundColor: "#023E8A",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <DetailStack.Screen name="Home" component={HomeScreen}></DetailStack.Screen>
  </DetailStack.Navigator>
);

// const HomeStackScreen2 = ({ navigation }) => (
//   <HomeStack.Navigator
//     screenOptions={{
//       gestureEnabled: true,
//       gestureDirection: "horizontal",
//       cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//       headerStyle: {
//         backgroundColor: "#368cfc",
//       },
//       headerTintColor: "#fff",
//       headerTitleStyle: {
//         fontWeight: "bold",
//       },
//     }}
//   >
//     <HomeStack.Screen
//       name="Home"
//       component={HomeScreen}
//       options={{
//         headerTitle: () => (
//           <Text
//             style={{
//               textAlign: "center",
//               flex: 1,
//               color: "#fff",
//               fontSize: 17,
//             }}
//           >
//             Home
//           </Text>
//         ),
//       }}
//     />
//     <HomeStack.Screen
//       name="Details"
//       component={DetailScreen}
//       options={{
//         headerTitle: () => (
//           <Text
//             style={{
//               textAlign: "center",
//               flex: 1,
//               color: "#fff",
//               fontSize: 16,
//             }}
//           >
//             CardSet
//           </Text>
//         ),
//         headerRight: () => <View></View>,
//       }}
//     />
//   </HomeStack.Navigator>
// );
