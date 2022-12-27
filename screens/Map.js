import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import MapView, { Marker } from "react-native-maps";

SplashScreen.preventAutoHideAsync();

export default function Map({ navigation }) {
  const [comment, setComment] = useState("");
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [fontsLoaded] = useFonts({
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const commentInputHandler = (text) => setComment(text);

  const keyboardClose = () => {
    setKeyboardShown(false);
    Keyboard.dismiss();
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardClose}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
            <Image source={require("../assets/Icons/arrow-left.png")} />
          </TouchableOpacity>

          <Text style={styles.title}>Мапа</Text>
          <View
            style={{ width: 24, height: 24, backgroundColor: "transparent" }}
          />
        </View>

        <View style={styles.main}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 30,
              longitude: 35,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={{ latitude: 30, longitude: 35 }} />
          </MapView>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    flex: 1,
  },
});
