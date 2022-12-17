import { Image, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Login from "./screens/Login";
import Registration from "./screens/Registration";
import Home from "./screens/Home";
import CreatePost from "./screens/CreatePost";
import Posts from "./screens/Posts";
import Profile from "./screens/Profile";

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
    <Tab.Navigator tabBarOptions={{ showLabel: false }}>
      <Tab.Screen
        name="Публікації"
        component={Posts}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Image source={require("./assets/Icons/grid.png")} />
          ),
        }}
      />
      <Tab.Screen
        name="Створити публікацію"
        component={CreatePost}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                width: 70,
                height: 40,
                backgroundColor: "#FF6C00",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={require("./assets/Icons/Union.png")} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Профіль"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Image source={require("./assets/Icons/user.png")} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
