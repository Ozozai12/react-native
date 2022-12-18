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

SplashScreen.preventAutoHideAsync();

export default function Comments({ navigation }) {
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

          <Text style={styles.title}>Коментарі</Text>
          <View
            style={{ width: 24, height: 24, backgroundColor: "transparent" }}
          />
        </View>

        <View style={styles.main}>
          <View style={styles.photoContainer} />
          <View style={styles.comments}>
            <View style={styles.commentContainer}>
              <View style={styles.avatar} />
              <View style={styles.commentItem}>
                <Text style={styles.commentText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </Text>
                <Text style={styles.commentTime}>18 грудня 2022 | 00:00</Text>
              </View>
            </View>
            <View style={styles.userCommentContainer}>
              <View style={styles.userAvatar} />
              <View style={styles.userCommentItem}>
                <Text style={styles.userCommentText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </Text>
                <Text style={styles.userCommentTime}>
                  18 грудня 2022 | 00:00
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.commentInput}>
            <TextInput
              placeholder="Коментувати..."
              value={comment}
              onChangeText={commentInputHandler}
              style={{ paddingLeft: 16, fontSize: 16, color: "#BDBDBD" }}
              onFocus={() => setKeyboardShown(true)}
            />
            <View style={styles.commetnBtn}>
              <Image source={require("../assets/Icons/Vector.png")} />
            </View>
          </View>
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
  comments: {
    marginTop: 32,
  },
  commentContainer: {
    marginHorizontal: 16,
    flexDirection: "row",
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "grey",
  },
  commentItem: {
    marginLeft: 16,
    marginBottom: 24,
    width: 299,
    minHeight: 69,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    alignItems: "flex-end",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
  },
  commentText: {
    fontFamily: "RobotoRegular",
    fontSize: 13,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  commentTime: {
    fontFamily: "RobotoRegular",
    fontSize: 10,
    color: "#BDBDBD",
    marginBottom: 16,
    marginRight: 16,
  },
  userCommentContainer: {
    marginHorizontal: 16,
    flexDirection: "row-reverse",
  },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "grey",
  },
  userCommentItem: {
    marginRight: 16,
    marginBottom: 24,
    width: 299,
    minHeight: 69,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    alignItems: "flex-start",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  userCommentText: {
    fontFamily: "RobotoRegular",
    fontSize: 13,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  userCommentTime: {
    fontFamily: "RobotoRegular",
    fontSize: 10,
    color: "#BDBDBD",
    marginBottom: 16,
    marginLeft: 16,
  },
  commentInput: {
    marginHorizontal: 16,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commetnBtn: {
    width: 34,
    height: 34,
    marginRight: 8,
    backgroundColor: "#FF6C00",
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
});
