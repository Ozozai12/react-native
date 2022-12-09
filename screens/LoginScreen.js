import {
  StyleSheet,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardShown, setKeyboardShown] = useState(false);
  const emailInputHandler = (text) => setEmail(text);
  const passwordInputHandler = (text) => setPassword(text);

  const onLogin = () => {
    console.log(`You loged in as ${email} with ${password}`);
  };

  const keyboardClose = () => {
    setKeyboardShown(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardClose}>
        <ImageBackground
          source={require("./assets/Images/backgroundImg.jpg")}
          style={styles.image}
        >
          <View
            style={{
              ...styles.form,
              marginBottom:
                Platform.OS == "android" && keyboardShown ? -230 : 0,
            }}
          >
            <KeyboardAvoidingView behavior={Platform.OS == "ios" && "padding"}>
              <Text style={styles.heading}>Увійти</Text>

              <View>
                <TextInput
                  placeholder="Адреса електронної пошти"
                  value={email}
                  onChangeText={emailInputHandler}
                  style={styles.input}
                  onFocus={() => setKeyboardShown(true)}
                />
              </View>
              <View
                style={{
                  marginTop: 16,
                  marginBottom: Platform.OS == "ios" && keyboardShown ? 100 : 0,
                }}
              >
                <TextInput
                  secureTextEntry={true}
                  placeholder="Пароль"
                  value={password}
                  onChangeText={passwordInputHandler}
                  style={styles.input}
                  onFocus={() => setKeyboardShown(true)}
                />
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={onLogin} style={styles.button}>
              <Text style={styles.btnText}>Увійти</Text>
            </TouchableOpacity>
            <Text style={styles.cta}>Немає акаунту? Зареєструватися</Text>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  thumb: {
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    marginBottom: 33,
    paddingTop: 33,
    fontSize: 30,
    fontWeight: "500",
  },
  input: {
    marginHorizontal: 16,
    height: 50,
    borderWidth: 1,
    paddingLeft: 16,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  button: {
    borderRadius: 100,
    marginTop: 43,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    marginHorizontal: 16,
    height: 51,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    color: "#fff",
  },
  cta: {
    textAlign: "center",
    marginBottom: 143,
  },
});
