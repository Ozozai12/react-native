import { Image, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const OtherStack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Login from "./screens/Login";
import Registration from "./screens/Registration";
import Home from "./screens/Home";
import CreatePost from "./screens/CreatePost";
import Posts from "./screens/Posts";
import Profile from "./screens/Profile";
import Comments from "./screens/Comments";

export const useRoute = (authorized) => {
  if (!authorized) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={Registration}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <OtherStack.Navigator>
      <OtherStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <OtherStack.Screen
        options={{ headerShown: false }}
        name="Comments"
        component={Comments}
      />
    </OtherStack.Navigator>
  );
};
