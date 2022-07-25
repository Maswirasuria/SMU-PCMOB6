import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Provider, useSelector } from "react-redux";
import LoggedInTabStack from "./components/LoggedInTabStack";
import store from "./redux/configureStore";
import SignInSignUpScreen from "./screens/SignInSignUpScreen";
import { useFonts } from "expo-font";


const Stack = createStackNavigator();

function App() {
  const token = useSelector((state) => state.auth.token);
  console.log(token);
  
  const [isFontLoaded] = useFonts({
    'Aldo-Pro': require("./assets/fonts/AldoPro.otf"),
    'Aldo-Pro-Bold': require("./assets/fonts/AldoProBold.otf")
  });

  console.log(isFontLoaded)

  return (
    <>
    {isFontLoaded ? <NavigationContainer>
      <Stack.Navigator
        initialRouteName={token != null ? "Logged In" : "SignInSignUp"}
        animationEnabled={false}
        screenOptions={{
          headerShown: false,
          headerMode: "none",
        }}
      >
        <Stack.Screen component={SignInSignUpScreen} name="SignInSignUp" />
        <Stack.Screen component={LoggedInTabStack} name="Logged In" />
      </Stack.Navigator>
    </NavigationContainer> : <Text>Loading...</Text> }
    </>
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}