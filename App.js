import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import Home from "./screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePost from "./screens/CreatePost";
import Posts from "./screens/Posts";
import Profile from "./screens/Profile";

export default function App() {
  const AuthStack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Публікації"
          component={Posts}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Створити публікацію"
          component={CreatePost}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Профіль"
          component={Profile}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

{
  /* <AuthStack.Navigator initialRouteName="Login">
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
  <AuthStack.Screen
    options={{ headerShown: false }}
    name="Home"
    component={Home}
  />
</AuthStack.Navigator>; */
}
