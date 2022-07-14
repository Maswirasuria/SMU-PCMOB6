import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import IndexScreen from "../screens/IndexScreen";
import CreateScreen from "../screens/CreateScreen";
import EditScreen from "../screens/EditScreen";
import ShowScreen from "../screens/DetailsScreen";
import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";
import { useSelector } from "react-redux";

const InnerStack = createStackNavigator();

export default function BlogStack() {
  const isDark = useSelector((state) => state.accountPref.isDark);
  const styles = isDark ? darkStyles: lightStyles;
  const headerOptions = {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerTintColor: styles.headerTint,
  };

  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="Index"
        component={IndexScreen}
        options={{ title: "MY G-BLOG", ...headerOptions, headerLeft: null,  }}
      />
      <InnerStack.Screen
        name="Add"
        component={CreateScreen}
        options={{ title: "ADD G-BLOG", ...headerOptions }}
      />
      <InnerStack.Screen
        name="Details"
        component={ShowScreen}
        options={{ title:"YOUR G-BLOG", ...headerOptions }}
      />
      <InnerStack.Screen
        name="Edit"
        component={EditScreen}
        options={{ title: "EDIT G-BLOG", ...headerOptions }}
      />
    </InnerStack.Navigator>
  );
}