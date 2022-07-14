import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BlogStack from "../components/BlogStack";
import AccountStack from "../components/AccountStack";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { commonStyles } from "../styles/commonStyles";
import {SignInSignUpScreen} from "../screens/SignInSignUpScreen";

const Tab = createBottomTabNavigator();

export default function LoggedInTabStack() {
  const isDark = useSelector((state) => state.accountPref.isDark);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
       
        tabBarActiveTintColor: "#00205b",
        tabBarInactiveTintColor: "teal",
        tabBarStyle: {
          backgroundColor: isDark ? "#181818" : "white",
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Blog") {
            iconName = "comments";
          } else if (route.name === "Settings") {
            iconName = "cog";
          }
          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Blog" component={BlogStack} options={{headerShown: false}} />
      <Tab.Screen name="Settings" component={AccountStack}  options={{headerShown: false}} />
      
    </Tab.Navigator>
  );
}