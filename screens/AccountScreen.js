import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Switch, Text, TouchableOpacity,View,} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { API, API_WHOAMI } from "../constants/API";
import { changeModeAction } from "../redux/ducks/accountPref";
import { logOutAction } from "../redux/ducks/blogAuth";
import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";
import * as ImagePicker from 'expo-image-picker';

export default function AccountScreen({ navigation }) {
  const [username, setUsername] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const [image, setImage] = useState(null);   
  const isDark = useSelector((state) => state.accountPref.isDark);
  const profilePicture = useSelector(
    (state) => state.accountPref.profilePicture
  );
  const dispatch = useDispatch();

  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };
  async function getUsername() {
    console.log("---- Getting user name ----");
    console.log(`Token is ${token}`);
    try {
      const response = await axios.get(API + API_WHOAMI, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log("Got user name!");
      setUsername(response.data.username);
    } catch (error) {
      console.log("Error getting user name");
      if (error.response) {
        console.log(error.response.data);
        if (error.response.data.status_code === 401) {
          signOut();
          navigation.navigate("SignInSignUp");
        }
      } else {
        console.log(error);
      }
      /// We should probably go back to the login screen???
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };






  function signOut() {
    dispatch(logOutAction());
    navigation.navigate("SignInSignUp");
  }

  function switchMode() {
    dispatch(changeModeAction());
  }

  useEffect(() => {
    console.log("Setting up nav listener");
    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running nav listener");
      setUsername(<ActivityIndicator />);
      getUsername();
    });
    getUsername();
    return removeListener;
  }, []);

  return (
    <View style={[commonStyles.container, { alignItems: "center" }]}>

    

      <Text style={[commonStyles.title, styles.text, { marginTop: 30 }]}>
        {" "}
        WELCOME {username} TO G-BLOG 
      </Text>




      <Image
        source={{ uri: profilePicture }}
        style={{ width: 100, height: 50, borderRadius: 100 }}
      />

<Image
        source={{ uri: image }}
        style={{ width: 400, height: 200, borderRadius: 100 }}
      />







      <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
        <Text style={{ marginTop: 40, fontSize: 20,fontFamily:"Aldo-Pro" , color: "white" }}>
          {" "}
          UPLOAD YOUR PROFILE. CAMERA TAP HERE.{" "}
        </Text>
      </TouchableOpacity>



      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 20,
        }}
      >
        <Text style={[styles.content, styles.text]}> LOVE DARK MODE </Text>
        <Switch value={isDark} onChange={switchMode} />
      </View>




      <TouchableOpacity style={[commonStyles.button]} onPress={signOut}>
        <Text style={styles.buttonText}>LOG OUT</Text>
      </TouchableOpacity>


      <TouchableOpacity
          style={[styles.button,{ marginTop: 20}]}    onPress={pickImage}>
          <Text style={styles.buttonText}>UPLOAD</Text>
          </TouchableOpacity>

      </View>
  );
}