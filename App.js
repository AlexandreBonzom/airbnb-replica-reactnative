import React from "react";
import { StyleSheet } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import HomeScreen from "./src/Containers/Home";
import SignInScreen from "./src/Containers/LogIn";
import SignUpScreen from "./src/Containers/SignUp";
import AuthLoadingScreen from "./src/Containers/AuthLoading";
import RoomScreen from "./src/Containers/Room";
import MapScreen from "./src/Containers/MapScreen";
import TabScreen from "./src/Containers/TabContainer";

const AppStack = createStackNavigator({
  Tab: TabScreen,
  Home: HomeScreen,
  Room: RoomScreen,
  Map: MapScreen
});

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen
});

const App = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
