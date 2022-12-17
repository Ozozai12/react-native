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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

SplashScreen.preventAutoHideAsync();

export default function CreatePost() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [fontsLoaded] = useFonts({
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  });
  const [keyboardShown, setKeyboardShown] = useState(false);
  const nameInputHandler = (text) => setName(text);
  const locationInputHandler = (text) => setLocation(text);

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

  const Tab = createBottomTabNavigator();

  return (
    <TouchableWithoutFeedback onPress={keyboardClose}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <View style={styles.header}>
          <Image source={require("../assets/Icons/arrow-left.png")} />
          <Text style={styles.title}>Створити публікацію</Text>
          <View
            style={{ width: 24, height: 24, backgroundColor: "transparent" }}
          />
        </View>
        <View style={styles.main}>
          <View style={styles.photoContainer}>
            <View style={styles.photoIcon}>
              <Image source={require("../assets/Icons/camera.png")} />
            </View>
          </View>
          <View style={styles.credentials}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <Text style={styles.credensTitle}>Завантажте фото</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Назва..."
                  value={name}
                  onChangeText={nameInputHandler}
                  style={styles.input}
                  onFocus={() => setKeyboardShown(true)}
                />
              </View>
              <View style={{ ...styles.inputContainer, marginTop: 16 }}>
                <Image
                  style={{ marginRight: 4 }}
                  source={require("../assets/Icons/map-pin.png")}
                />
                <TextInput
                  placeholder="Місцевість..."
                  value={location}
                  onChangeText={locationInputHandler}
                  style={styles.input}
                  onFocus={() => setKeyboardShown(true)}
                />
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Опублікувати</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </View>
        <View style={styles.tabs}></View>
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
  },
  photoContainer: {
    width: 343,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    marginHorizontal: 16,
  },
  photoIcon: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  credentials: {
    marginTop: 8,
  },
  credensTitle: {
    fontFamily: "RobotoRegular",
    color: "#BDBDBD",
    marginBottom: 32,
    marginLeft: 16,
    fontSize: 16,
  },
  inputContainer: {
    marginHorizontal: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 50,
    fontFamily: "RobotoMedium",
    fontSize: 16,
  },
  button: {
    marginTop: 32,
    marginHorizontal: 16,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "RobotoRegular",
    color: "#BDBDBD",
    fontSize: 16,
  },
});
