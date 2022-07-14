import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import CameraScreen from "../screens/CameraScreen";
import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

export default function AccountStack() {
  const isDark = useSelector((state) => state.accountPref.isDark);
  const styles = isDark ? darkStyles : lightStyles;

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={AccountScreen}
        name="Account"
        options={{
          title: "YOUR G-BLOG PROFILE",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        component={CameraScreen}
        name="Camera"
        options={{
          title: "TAKE A SHOOT",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: styles.headerTint,
        }}
      />
    </Stack.Navigator>
  );
}