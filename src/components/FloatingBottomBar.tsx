import { Pressable, StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { BlurView } from "expo-blur";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppTheme } from "../theme/useAppTheme";

const tabs = [
  {
    name: "Home",
    icon: "home",
  },
  {
    name: "Ideas",
    icon: "bulb-outline",
  },
  {
    name: "Leaderboard",
    icon: "trophy-outline",
  },
];

export default function FloatingBottomBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const rootNavigation = navigation.getParent();

  const { theme, isDark } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}
    >
      <View style={styles.row}>
        {/* Navigation Pill */}
        <BlurView
          intensity={70}
          tint={isDark ? "dark" : "light"}
          style={[
            styles.navBar,
            {
              backgroundColor: isDark
                ? "rgba(25,28,36,0.88)"
                : "rgba(255,255,255,0.88)",
              borderColor: isDark
                ? "rgba(255,255,255,0.12)"
                : "rgba(0,0,0,0.08)",
            },
          ]}
        >
          {tabs.map((tab, index) => {
            const active = state.index === index;

            return (
              <Pressable
                key={tab.name}
                onPress={() => navigation.navigate(tab.name)}
                style={styles.tabContainer}
              >
                <View
                  style={[
                    styles.tab,
                    active && {
                      backgroundColor: isDark
                        ? "rgba(79,70,229,0.35)"
                        : theme.primaryLight,
                    },
                  ]}
                >
                  <Ionicons
                    name={tab.icon as any}
                    size={18}
                    color={
                      active ? theme.primary : isDark ? "#FFFFFF" : "#333333"
                    }
                  />

                  <Text
                    style={[
                      styles.label,
                      {
                        color: active
                          ? theme.primary
                          : isDark
                            ? "#FFFFFF"
                            : "#333333",
                      },
                      active && styles.activeLabel,
                    ]}
                  >
                    {tab.name}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </BlurView>

        {/* Create Button */}
        <Pressable
          style={[
            styles.addButton,
            {
              backgroundColor: theme.primary,
              shadowColor: theme.primary,
            },
          ]}
          onPress={() => {
            rootNavigation?.navigate("SubmitIdea" as never);
          }}
        >
          <Ionicons name="add" size={32} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -6,
    paddingHorizontal: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  navBar: {
    flex: 1,
    height: 68,
    borderRadius: 34,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    borderWidth: 1,
  },

  tabContainer: {
    flex: 1,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
  },

  tab: {
    width: "96%",
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },

  label: {
    fontSize: 11,
    fontWeight: "500",
  },

  activeLabel: {
    fontWeight: "700",
  },

  addButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
