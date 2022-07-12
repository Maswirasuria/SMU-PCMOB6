import axios from "axios";
import React, { useState } from "react";
import { ActivityIndicator, Keyboard, LayoutAnimation, Text, TextInput, TouchableOpacity,
  UIManager, 
  View,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { API, API_LOGIN, API_SIGNUP } from "../constants/API";
import { logInAction } from "../redux/ducks/blogAuth";
import { commonStyles } from "../styles/commonStyles";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
} //Needs to be manually enabled for android

export default function SignInSignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [isLogIn, setIsLogIn] = useState(true);

  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  async function login() {
    console.log("---- Login time ----");
    Keyboard.dismiss();

    try {
      setLoading(true);
      const response = await axios.post(API + API_LOGIN, {
        username,
        password,
      });
      console.log("Success logging in!");
      console.log(response.data.access_token);
      dispatch({ ...logInAction(), payload: response.data.access_token });
      setLoading(false);
      navigation.navigate("Logged In");
    } catch (error) {
      setLoading(false);
      console.log("Error logging in!");
      console.log(error);
      setErrorText(error.response.data.description);
    }
  }

  async function signUp() {
    if (password != confirmPassword) {
      setErrorText("Your passwords don't match. Check and try again.");
    } else {
      try {
        setLoading(true);
        const response = await axios.post(API + API_SIGNUP, {
          username,
          password,
        });
        if (response.data.Error) {
          // We have an error message for if the user already exists
          setErrorText(response.data.Error);
          setLoading(false);
        } else {
          console.log("Success signing up!");
          setLoading(false);
          login();
        }
      } catch (error) {
        setLoading(false);
        console.log("Error logging in!");
        console.log(error.response);
        setErrorText(error.response.data.description);
      }
    }
  }

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>{isLogIn ? "Log In" : "Sign Up"}</Text>
      <View style={commonStyles.inputView}>
        <TextInput
          style={commonStyles.textInput}
          placeholder="Username:"
          placeholderTextColor="#00205B"
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View style={commonStyles.inputView}>
        <TextInput
          style={commonStyles.textInput}
          placeholder="Password:"
          placeholderTextColor="#00205B"
          secureTextEntry={true}
          onChangeText={(pw) => setPassword(pw)}
        />
      </View>

      {isLogIn ? (
        <View />
      ) : (
        <View style={commonStyles.inputView}>
          <TextInput
            style={commonStyles.textInput}
            placeholder="Confirm Password:"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(pw) => setConfirmPassword(pw)}
          />
        </View>
      )}

      <View />
      <View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={commonStyles.button}
            onPress={isLogIn ? login : signUp}
          >
            <Text style={commonStyles.buttonText}>
              {" "}
              {isLogIn ? "Log In" : "Sign Up"}{" "}
            </Text>
          </TouchableOpacity>
          {loading ? (
            <ActivityIndicator style={{ marginLeft: 10 }} />
          ) : (
            <View />
          )}
        </View>
      </View>
      <Text style={commonStyles.errorText}>{errorText}</Text>
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext({
            duration: 200,
            create: { type: "linear", property: "opacity" },
            update: { type: "spring", springDamping: 0.6 },
          });
          setIsLogIn(!isLogIn);
          setErrorText("");
        }}
      >
        <Text style={commonStyles.switchText}>
          {" "}
          {isLogIn
            ? "No account? Sign up now."
            : "Already have an account? Log in here."}
        </Text>
      </TouchableOpacity>
    </View>
  );
}