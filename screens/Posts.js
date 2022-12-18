import { View, Text, StyleSheet, Image } from "react-native";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function Posts({ navigation }) {
  const [fontsLoaded] = useFonts({
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.header}>
        <View
          style={{ width: 24, height: 24, backgroundColor: "transparent" }}
        />
        <Text style={styles.title}>Публікації</Text>
        <Image
          style={styles.logout}
          source={require("../assets/Icons/log-out.png")}
        />
      </View>
      <View style={styles.main}>
        <View style={styles.profile}>
          <Image
            style={styles.avatar}
            source={require("../assets/Images/avatar.jpg")}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Natali Romanova</Text>
            <Text style={styles.email}>email@example.com</Text>
          </View>
        </View>
        <View style={styles.posts}>
          <View style={styles.postItem}>
            <View style={styles.postBackdrop} />
            <View style={styles.credentials}>
              <Text style={styles.postName}>Назва</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Comments")}
                  >
                    <Image
                      source={require("../assets/Icons/message-circle.png")}
                    />
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: "#BDBDBD",
                      fontFamily: "RobotoRegular",
                      fontSize: 16,
                      marginLeft: 6,
                    }}
                  >
                    0
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image source={require("../assets/Icons/map-pin.png")} />
                  <Text
                    style={{
                      fontFamily: "RobotoRegular",
                      fontSize: 16,
                      marginLeft: 4,
                      textDecorationLine: "underline",
                    }}
                  >
                    Локація
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  header: {
    marginTop: 55,
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 10,
  },
  title: {
    fontSize: 17,
    fontFamily: "RobotoMedium",
    marginBottom: 11,
  },
  main: {
    borderTopWidth: 1,
    borderTopColor: "#BDBDBD",
  },
  profile: {
    marginTop: 32,
    marginLeft: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  profileInfo: {
    marginLeft: 8,
  },
  name: {
    fontFamily: "RobotoBold",
    fontSize: 13,
  },
  email: {
    fontFamily: "RobotoRegular",
    fontSize: 11,
  },
  posts: {
    marginHorizontal: 16,
    marginTop: 32,
    justifyContent: "center",
  },
  postBackdrop: {
    width: 343,
    height: 240,
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
  },
  credentials: {
    marginTop: 8,
  },
  postName: {
    fontFamily: "RobotoMedium",
    fontSize: 16,
    marginBottom: 8,
  },
});
