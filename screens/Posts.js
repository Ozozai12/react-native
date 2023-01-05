import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  query,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { authSignOutUser } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { db } from "../firebase/config";

SplashScreen.preventAutoHideAsync();

export default function Posts({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const ref = query(collection(firestore, "posts"));
      onSnapshot(ref, (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
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
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.header}>
        <View
          style={{ width: 24, height: 24, backgroundColor: "transparent" }}
        />
        <Text style={styles.title}>Публікації</Text>
        <TouchableOpacity
          style={styles.logout}
          onPress={() => dispatch(authSignOutUser())}
        >
          <Image source={require("../assets/Icons/log-out.png")} />
        </TouchableOpacity>
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
          <FlatList
            data={posts}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => (
              <View style={styles.postItem}>
                <View>
                  <Image
                    style={styles.postImage}
                    source={{ uri: item.photo }}
                  />
                </View>
                <View style={styles.credentials}>
                  <Text style={styles.postName}>{item.name}</Text>
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
                        onPress={() =>
                          navigation.navigate("Comments", item.photo)
                        }
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
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Map", item.coords)}
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
                        {item.location}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
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
  postImage: {
    width: 343,
    height: 240,
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
