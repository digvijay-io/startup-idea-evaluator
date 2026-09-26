import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { RootStackParamList } from "../navigation/RootNavigator";
import { useAppTheme } from "../theme/useAppTheme";
import { toggleTheme } from "../store/slices/themeSlice";

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();

  const ideas = useAppSelector((state) => state.ideas.ideas);

  const { theme, isDark } = useAppTheme();

  const totalIdeas = ideas.length;

  const totalVotes = useMemo(() => {
    return ideas.reduce((total, idea) => total + idea.voteCount, 0);
  }, [ideas]);

  const topIdea = useMemo(() => {
    if (ideas.length === 0) {
      return null;
    }

    return [...ideas].sort((a, b) => b.rating - a.rating)[0];
  }, [ideas]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={[styles.smallText, { color: theme.primary }]}>
              StartupHub
            </Text>

            {/* Theme Button */}
            <Pressable
              style={[
                styles.themeButton,
                {
                  backgroundColor: theme.primaryLight,
                },
              ]}
              onPress={async () => {
                const newTheme = !isDark;

                dispatch(toggleTheme());

                const { saveTheme } = await import("../utils/storage");
                await saveTheme(newTheme);
              }}
            >
              <Ionicons
                name={isDark ? "sunny-outline" : "moon-outline"}
                size={26}
                color={theme.primary}
              />
            </Pressable>
          </View>

          <Text style={[styles.title, { color: theme.text }]}>
            Turn ideas into possibilities.
          </Text>

          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Share your startup idea, explore others, and see what the community
            thinks.
          </Text>
        </View>

        {/* Submit CTA */}
        <Pressable
          style={[
            styles.submitButton,
            {
              backgroundColor: theme.primary,
            },
          ]}
          onPress={() => navigation.navigate("SubmitIdea")}
        >
          <View>
            <Text style={styles.submitTitle}>Submit an idea</Text>

            <Text style={styles.submitSubtitle}>Get your AI rating</Text>
          </View>

          <Text style={styles.arrow}>→</Text>
        </Pressable>

        {/* Stats */}
        <View
          style={[
            styles.statsSection,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {totalIdeas}
            </Text>

            <Text style={[styles.statLabel, { color: theme.muted }]}>
              Ideas submitted
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {totalVotes}
            </Text>

            <Text style={[styles.statLabel, { color: theme.muted }]}>
              Community votes
            </Text>
          </View>
        </View>

        {/* Top Rated */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Top rated
          </Text>

          <Pressable
            onPress={() =>
              navigation.navigate("MainTabs", {
                screen: "Ideas",
              })
            }
          >
            <Text style={[styles.viewAll, { color: theme.primary }]}>
              View all
            </Text>
          </Pressable>
        </View>

        {topIdea ? (
          <View
            style={[
              styles.ideaCard,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={styles.ideaTopRow}>
              <View
                style={[
                  styles.ideaRank,
                  {
                    backgroundColor: theme.primaryLight,
                  },
                ]}
              >
                <Text style={[styles.ideaRankText, { color: theme.primary }]}>
                  #1
                </Text>
              </View>

              <View style={styles.rating}>
                <Text style={[styles.ratingValue, { color: theme.text }]}>
                  {topIdea.rating}
                </Text>

                <Text style={[styles.ratingLabel, { color: theme.muted }]}>
                  AI rating
                </Text>
              </View>
            </View>

            <Text style={[styles.ideaName, { color: theme.text }]}>
              {topIdea.name}
            </Text>

            <Text
              style={[styles.ideaTagline, { color: theme.textSecondary }]}
              numberOfLines={2}
            >
              {topIdea.tagline}
            </Text>

            <View
              style={[
                styles.ideaBottom,
                {
                  borderTopColor: theme.border,
                },
              ]}
            >
              <Text style={[styles.votes, { color: theme.muted }]}>
                {topIdea.voteCount} {topIdea.voteCount === 1 ? "vote" : "votes"}
              </Text>

              <Text style={[styles.arrowSmall, { color: theme.primary }]}>
                →
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.emptyState,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No ideas yet
            </Text>

            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              Be the first to submit a startup idea.
            </Text>
          </View>
        )}

        {/* Explore */}
        <Pressable
          style={styles.exploreButton}
          onPress={() =>
            navigation.navigate("MainTabs", {
              screen: "Ideas",
            })
          }
        >
          <Text style={[styles.exploreText, { color: theme.text }]}>
            Explore startup ideas
          </Text>

          <Text style={[styles.exploreArrow, { color: theme.primary }]}>→</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 120,
  },

  header: {
    marginBottom: 24,
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  themeButton: {
    width: 46,
    height: 46,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  smallText: {
    fontSize: 22,
    fontWeight: "700",
  },

  title: {
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "800",
    maxWidth: 330,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
    maxWidth: 350,
  },

  submitButton: {
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 7,
    elevation: 4,
  },

  submitTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  submitSubtitle: {
    fontSize: 12,
    color: "#DDF3E3",
    marginTop: 3,
  },

  arrow: {
    fontSize: 26,
    color: "#FFFFFF",
    fontWeight: "300",
  },

  statsSection: {
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 1,
  },

  stat: {
    flex: 1,
    alignItems: "center",
  },

  statValue: {
    fontSize: 23,
    fontWeight: "800",
  },

  statLabel: {
    fontSize: 11,
    marginTop: 3,
  },

  divider: {
    width: 1,
    height: 38,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
  },

  viewAll: {
    fontSize: 13,
    fontWeight: "700",
  },

  ideaCard: {
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    marginBottom: 18,
  },

  ideaTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  ideaRank: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  ideaRankText: {
    fontSize: 12,
    fontWeight: "800",
  },

  rating: {
    alignItems: "flex-end",
  },

  ratingValue: {
    fontSize: 20,
    fontWeight: "800",
  },

  ratingLabel: {
    fontSize: 10,
    marginTop: 1,
  },

  ideaName: {
    fontSize: 19,
    fontWeight: "800",
  },

  ideaTagline: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },

  ideaBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 17,
    paddingTop: 13,
    borderTopWidth: 1,
  },

  votes: {
    fontSize: 12,
    fontWeight: "600",
  },

  arrowSmall: {
    fontSize: 18,
  },

  emptyState: {
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "800",
  },

  emptyText: {
    fontSize: 13,
    marginTop: 5,
  },

  exploreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 4,
  },

  exploreText: {
    fontSize: 14,
    fontWeight: "700",
  },

  exploreArrow: {
    fontSize: 20,
  },
});
