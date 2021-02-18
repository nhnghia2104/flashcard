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
import TrueOrFalseCard from "./Learn/TrueOrFalseCard";
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
        name="Huhu"
        component={TrueOrFalseCard}
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
    <DetailStack.Screen
      name="Home"
      component={HomeStackScreen}
    ></DetailStack.Screen>
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
