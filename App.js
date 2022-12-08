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
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardShown, setKeyboardShown] = useState(false);
  const nameInputHandler = (text) => setName(text);
  const passwordInputHandler = (text) => setPassword(text);

  const onLogin = () => {
    console.log(`You loged in as ${name} with ${password}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/Images/backgroundImg.jpg")}
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.form}>
              <Text style={styles.heading}>Увійти</Text>

              <View>
                <TextInput
                  placeholder="Адреса електронної пошти"
                  value={name}
                  onChangeText={nameInputHandler}
                  style={styles.input}
                  onFocus={() => setKeyboardShown(true)}
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  secureTextEntry={true}
                  placeholder="Пароль"
                  value={password}
                  onChangeText={passwordInputHandler}
                  style={styles.input}
                  onFocus={() => setKeyboardShown(true)}
                />
              </View>
            </View>
          </KeyboardAvoidingView>

          <TouchableOpacity onPress={onLogin} style={styles.button}>
            <Text style={styles.btnText}>Увійти</Text>
          </TouchableOpacity>
          <Text style={styles.cta}>Немає акаунту? Зареєструватися</Text>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
    paddingBottom: 16,
  },
  thumb: {
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    marginBottom: 33,
    paddingTop: 33,
    fontSize: 30,
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
    marginBottom: 132,
  },
});

{
  /* <View
  style={{
    ...styles.form,
    marginTop: keyboardShown ? 273 : 323,
  }}
></View>; */
}
