import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainTabNavigator from "./MainTabNavigator";
import SubmitIdeaScreen from "../screens/SubmitIdeaScreen";

export type RootStackParamList = {
  MainTabs: {
    screen?: "Home" | "Ideas" | "Leaderboard";
  } | undefined;
  SubmitIdea: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SubmitIdea"
        component={SubmitIdeaScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}