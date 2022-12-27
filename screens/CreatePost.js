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
import { useState, useCallback, useRef, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

SplashScreen.preventAutoHideAsync();

export default function CreatePost({ navigation }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState("");
  const [keyboardShown, setKeyboardShown] = useState(false);

  const [hasLocPremissions, setHasLocPremissions] = useState(false);
  const [photo, setPhoto] = useState(null);

  const cameraRef = useRef(null);

  const [fontsLoaded] = useFonts({
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const nameInputHandler = (text) => setName(text);
  const locationInputHandler = (text) => setLocation(text);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        let location = await Location.getCurrentPositionAsync({});
        setCoords(`${location.coords.latitude} ${location.coords.longitude}`);

        setPhoto(photo.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(coords);
  // const savePhoto = async () => {
  //   if (photo) {
  //     try {
  //       await MediaLibrary.createAssetAsync(photo);
  //       setPhoto(null);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

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

  const sendPost = () => {
    navigation.navigate("Posts", { photo, name, location });
    clearPost();
  };

  const clearPost = () => {
    setName("");
    setLocation("");
    setPhoto(null);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardClose}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
            <Image source={require("../assets/Icons/arrow-left.png")} />
          </TouchableOpacity>

          <Text style={styles.title}>Створити публікацію</Text>
          <View
            style={{ width: 24, height: 24, backgroundColor: "transparent" }}
          />
        </View>
        <View style={styles.main}>
          {!photo && (
            <Camera style={styles.photoContainer} ref={cameraRef}>
              <TouchableOpacity
                style={styles.photoIcon}
                onPress={() => takePhoto()}
              >
                <Image source={require("../assets/Icons/camera.png")} />
              </TouchableOpacity>
            </Camera>
          )}

          {photo && (
            <Image source={{ uri: photo }} style={styles.photoContainer} />
          )}

          <View style={styles.credentials}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              {!photo && <Text style={styles.credensTitle}>Зробіть фото!</Text>}
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
              {photo && name && location ? (
                <TouchableOpacity
                  style={styles.buttonActive}
                  onPress={sendPost}
                >
                  <Text style={styles.buttonTextActive}>Опублікувати</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.buttonInactive}>
                  <Text style={styles.buttonTextInactive}>Опублікувати</Text>
                </View>
              )}
            </KeyboardAvoidingView>
          </View>
        </View>
        <TouchableOpacity style={styles.delete} onPress={() => clearPost()}>
          <Image source={require("../assets/Icons/trash-2.png")} />
        </TouchableOpacity>
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
  photoBtn: {
    height: 20,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "E8E8E8",
    borderRadius: 5,
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
  buttonInactive: {
    marginTop: 32,
    marginHorizontal: 16,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonActive: {
    marginTop: 32,
    marginHorizontal: 16,
    height: 50,
    backgroundColor: "#FF6C00",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextInactive: {
    fontFamily: "RobotoRegular",
    color: "#BDBDBD",
    fontSize: 16,
  },
  buttonTextActive: {
    fontFamily: "RobotoRegular",
    color: "#fff",
    fontSize: 16,
  },
  delete: {
    marginTop: 120,
    marginHorizontal: 153,
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
