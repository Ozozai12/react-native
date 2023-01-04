import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { authSignOutUser } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";

export default function Profile({ navigation }) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Images/backgroundImg.jpg")}
        style={styles.image}
      >
        <View style={styles.screen}>
          <View style={styles.postsContainer}>
            <View style={styles.avatar}>
              <Image
                source={require("../assets/Images/avatarBig.png")}
                style={{ resizeMode: "cover", marginBottom: -45 }}
              />
              <Image
                style={styles.remBtn}
                source={require("../assets/Icons/remove.png")}
              />
            </View>
            <TouchableOpacity
              onPress={() => dispatch(authSignOutUser())}
              style={styles.logout}
            >
              <Image source={require("../assets/Icons/log-out.png")} />
            </TouchableOpacity>

            <Text style={styles.username}>Natali Romanova</Text>
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
                      <Image
                        source={require("../assets/Icons/thumbs-up.png")}
                        style={{ marginLeft: 24 }}
                      />
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
      </ImageBackground>
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
    marginBottom: -100,
  },
  screen: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginTop: -60,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  remBtn: {
    marginRight: -20,
    marginBottom: 5,
    width: 40,
    height: 40,
  },
  postsContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    height: 665,
    position: "relative",
  },
  logout: {
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: 22,
    marginRight: 16,
  },
  username: {
    fontFamily: "RobotoMedium",
    fontSize: 30,
    marginTop: 32,
  },
  posts: {
    marginHorizontal: 16,
    marginTop: 33,
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
