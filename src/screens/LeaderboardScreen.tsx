import React, { useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { useAppSelector } from "../store/hooks";
import { useAppTheme } from "../theme/useAppTheme";

const LeaderboardScreen = () => {
  const ideas = useAppSelector(
    (state) => state.ideas.ideas
  );

  const { theme, isDark } = useAppTheme();

  const topIdeas = useMemo(() => {
    return [...ideas]
      .sort((a, b) => b.voteCount - a.voteCount)
      .slice(0, 5);
  }, [ideas]);

  const getRankBadge = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";

    return `#${index + 1}`;
  };

  const getGradientColors = (
    index: number
  ): [string, string] => {
    if (!isDark) {
      if (index === 0) {
        return ["#FFE0A3", "#FFF4DD"];
      }

      if (index === 1) {
        return ["#C9DFFF", "#EEF5FF"];
      }

      if (index === 2) {
        return ["#DEC9FF", "#F5EEFF"];
      }

      if (index === 3) {
        return ["#C5EEE4", "#F0FBF8"];
      }

      return ["#FFD0DC", "#FFF0F4"];
    }

    if (index === 0) {
      return ["#5C4720", "#302A1D"];
    }

    if (index === 1) {
      return ["#29405C", "#202B38"];
    }

    if (index === 2) {
      return ["#493761", "#2D2638"];
    }

    if (index === 3) {
      return ["#21483F", "#1D302B"];
    }

    return ["#56313C", "#32252A"];
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: theme.text,
          },
        ]}
      >
        Leaderboard 🏆
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            color: theme.textSecondary,
          },
        ]}
      >
        Top startup ideas by votes
      </Text>

      <FlatList
        data={topIdeas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View
            style={[
              styles.emptyState,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <Text
              style={[
                styles.emptyTitle,
                {
                  color: theme.text,
                },
              ]}
            >
              No ideas to rank yet
            </Text>

            <Text
              style={[
                styles.emptyText,
                {
                  color: theme.textSecondary,
                },
              ]}
            >
              Submit some startup ideas to build the
              leaderboard.
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <LinearGradient
            colors={getGradientColors(index)}
            style={[
              styles.card,
              index === 0 && styles.firstCard,
            ]}
          >
            {/* Rank Badge */}
            <View
              style={[
                styles.rankBadge,
                index === 0 && styles.firstBadge,
                index === 1 && styles.secondBadge,
                index === 2 && styles.thirdBadge,
                index > 2 && {
                  backgroundColor: isDark
                    ? "#34413C"
                    : "#D9E3E6",
                },
              ]}
            >
              <Text
                style={[
                  styles.rankText,
                  index < 3 && styles.medalText,
                  index >= 3 && {
                    color: theme.primary,
                  },
                ]}
              >
                {getRankBadge(index)}
              </Text>
            </View>

            {/* Idea Content */}
            <View style={styles.content}>
              <Text
                style={[
                  styles.name,
                  {
                    color: isDark
                      ? "#F4F6F5"
                      : "#18212B",
                  },
                ]}
              >
                {item.name}
              </Text>

              <Text
                style={[
                  styles.tagline,
                  {
                    color: isDark
                      ? "#C1C9C5"
                      : "#5F6368",
                  },
                ]}
                numberOfLines={2}
              >
                {item.tagline}
              </Text>

              {/* Stats */}
              <View style={styles.stats}>
                <View style={styles.statItem}>
                  <Text
                    style={[
                      styles.rating,
                      {
                        color: isDark
                          ? "#F4F6F5"
                          : "#18212B",
                      },
                    ]}
                  >
                    ⭐ {item.rating}
                  </Text>

                  <Text
                    style={[
                      styles.label,
                      {
                        color: isDark
                          ? "#AEB8B3"
                          : "#6B7075",
                      },
                    ]}
                  >
                    AI Rating
                  </Text>
                </View>

                <View style={styles.statItem}>
                  <Text
                    style={[
                      styles.votes,
                      {
                        color: isDark
                          ? "#F4F6F5"
                          : "#18212B",
                      },
                    ]}
                  >
                    👍 {item.voteCount}
                  </Text>

                  <Text
                    style={[
                      styles.label,
                      {
                        color: isDark
                          ? "#AEB8B3"
                          : "#6B7075",
                      },
                    ]}
                  >
                    Votes
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        )}
      />
    </SafeAreaView>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 20,
  },

  list: {
    paddingBottom: 100,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    marginBottom: 14,
    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },

  firstCard: {
    shadowOpacity: 0.16,
    elevation: 7,
  },

  rankBadge: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    backgroundColor: "#D9E3E6",
  },

  firstBadge: {
    backgroundColor: "#FFC857",
  },

  secondBadge: {
    backgroundColor: "#8DB9F2",
  },

  thirdBadge: {
    backgroundColor: "#B895E8",
  },

  rankText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#159B70",
  },

  medalText: {
    fontSize: 27,
  },

  content: {
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: "800",
  },

  tagline: {
    fontSize: 13,
    marginTop: 4,
  },

  stats: {
    flexDirection: "row",
    gap: 18,
    marginTop: 12,
  },

  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  rating: {
    fontSize: 14,
    fontWeight: "700",
  },

  votes: {
    fontSize: 14,
    fontWeight: "700",
  },

  label: {
    fontSize: 11,
  },

  emptyState: {
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginTop: 30,
    borderWidth: 1,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "800",
  },

  emptyText: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 19,
  },
});