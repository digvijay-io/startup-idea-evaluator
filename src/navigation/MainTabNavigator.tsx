import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import IdeasListScreen from "../screens/IdeasListScreen";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import FloatingBottomBar from "../components/FloatingBottomBar";

export type MainTabParamList = {
  Home: undefined;
  Ideas: undefined;
  Leaderboard: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <FloatingBottomBar {...props} />}
      screenOptions={{
        headerShown : false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
        }}
      />

      <Tab.Screen
        name="Ideas"
        component={IdeasListScreen}
        options={{
          title: "Ideas",
        }}
      />

      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          title: "Leaderboard",
        }}
      />
    </Tab.Navigator>
  );
}