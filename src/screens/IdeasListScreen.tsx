import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { upvoteIdea } from "../store/slices/ideaSlice";
import {
  getVotedIdeas,
  markIdeaAsVoted,
} from "../utils/voteStorage";
import { useAppTheme } from "../theme/useAppTheme";

const IdeasListScreen = () => {
  const dispatch = useAppDispatch();

  const ideas = useAppSelector(
    (state) => state.ideas.ideas
  );

  const { theme } = useAppTheme();

  const [expandedId, setExpandedId] = useState<string | null>(
    null
  );

  const [votedIdeas, setVotedIdeas] = useState<string[]>([]);

  const [sortBy, setSortBy] = useState<"rating" | "votes">(
    "rating"
  );

  // Load ideas that this device has already voted for
  useEffect(() => {
    const loadVotedIdeas = async () => {
      const savedVotedIdeas = await getVotedIdeas();
      setVotedIdeas(savedVotedIdeas);
    };

    loadVotedIdeas();
  }, []);

  // Handle upvote
  const handleUpvote = async (ideaId: string) => {
    if (votedIdeas.includes(ideaId)) {
      return;
    }

    dispatch(upvoteIdea(ideaId));

    await markIdeaAsVoted(ideaId);

    setVotedIdeas((current) => [
      ...current,
      ideaId,
    ]);
  };

  const sortedIdeas = useMemo(() => {
    return [...ideas].sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return b.voteCount - a.voteCount;
    });
  }, [ideas, sortBy]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      {/* Header */}
      <Text
        style={[
          styles.title,
          {
            color: theme.text,
          },
        ]}
      >
        Startup Ideas
      </Text>

      {/* Sort Controls */}
      <View style={styles.sortContainer}>
        <Text
          style={[
            styles.sortLabel,
            {
              color: theme.textSecondary,
            },
          ]}
        >
          Sort by:
        </Text>

        <Pressable
          style={[
            styles.sortButton,
            {
              backgroundColor:
                sortBy === "rating"
                  ? theme.primary
                  : theme.surface,
              borderColor: theme.border,
            },
          ]}
          onPress={() => setSortBy("rating")}
        >
          <Text
            style={[
              styles.sortText,
              {
                color:
                  sortBy === "rating"
                    ? "#FFFFFF"
                    : theme.textSecondary,
              },
            ]}
          >
            ⭐ Rating
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.sortButton,
            {
              backgroundColor:
                sortBy === "votes"
                  ? theme.primary
                  : theme.surface,
              borderColor: theme.border,
            },
          ]}
          onPress={() => setSortBy("votes")}
        >
          <Text
            style={[
              styles.sortText,
              {
                color:
                  sortBy === "votes"
                    ? "#FFFFFF"
                    : theme.textSecondary,
              },
            ]}
          >
            👍 Votes
          </Text>
        </Pressable>
      </View>

      {/* Ideas List */}
      <FlatList
        data={sortedIdeas}
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
              No startup ideas yet
            </Text>

            <Text
              style={[
                styles.emptyText,
                {
                  color: theme.textSecondary,
                },
              ]}
            >
              Submit the first idea and see what the
              community thinks.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const hasVoted = votedIdeas.includes(item.id);

          const isExpanded =
            expandedId === item.id;

          return (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                },
              ]}
            >
              {/* Idea Name */}
              <Text
                style={[
                  styles.name,
                  {
                    color: theme.text,
                  },
                ]}
              >
                {item.name}
              </Text>

              {/* Tagline */}
              <Text
                style={[
                  styles.tagline,
                  {
                    color: theme.textSecondary,
                  },
                ]}
              >
                {item.tagline}
              </Text>

              {/* Description */}
              <Text
                style={[
                  styles.description,
                  {
                    color: theme.textSecondary,
                  },
                ]}
              >
                {isExpanded
                  ? item.description
                  : `${item.description.slice(0, 80)}${
                      item.description.length > 80
                        ? "..."
                        : ""
                    }`}
              </Text>

              {/* Read More */}
              <Pressable
                onPress={() =>
                  setExpandedId(
                    isExpanded ? null : item.id
                  )
                }
              >
                <Text
                  style={[
                    styles.readMore,
                    {
                      color: theme.primary,
                    },
                  ]}
                >
                  {isExpanded
                    ? "Show less"
                    : "Read More"}
                </Text>
              </Pressable>

              {/* Rating & Votes */}
              <View style={styles.stats}>
                <View
                  style={[
                    styles.statBadge,
                    {
                      backgroundColor:
                        theme.primaryLight,
                    },
                  ]}
                >
                  <Text style={styles.ratingIcon}>
                    ⭐
                  </Text>

                  <Text
                    style={[
                      styles.statValue,
                      {
                        color: theme.text,
                      },
                    ]}
                  >
                    {item.rating}
                  </Text>

                  <Text
                    style={[
                      styles.statLabel,
                      {
                        color: theme.textSecondary,
                      },
                    ]}
                  >
                    Rating
                  </Text>
                </View>

                <View
                  style={[
                    styles.statBadge,
                    {
                      backgroundColor:
                        theme.primaryLight,
                    },
                  ]}
                >
                  <Text style={styles.voteIcon}>
                    👍
                  </Text>

                  <Text
                    style={[
                      styles.statValue,
                      {
                        color: theme.text,
                      },
                    ]}
                  >
                    {item.voteCount}
                  </Text>

                  <Text
                    style={[
                      styles.statLabel,
                      {
                        color: theme.textSecondary,
                      },
                    ]}
                  >
                    Votes
                  </Text>
                </View>
              </View>

              {/* Upvote */}
              <Pressable
                style={[
                  styles.upvoteButton,
                  {
                    backgroundColor: hasVoted
                      ? theme.muted
                      : theme.primary,
                  },
                ]}
                onPress={() =>
                  handleUpvote(item.id)
                }
                disabled={hasVoted}
              >
                <Text style={styles.upvoteText}>
                  {hasVoted
                    ? "✓ Voted"
                    : "👍 Upvote"}
                </Text>
              </Pressable>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default IdeasListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  list: {
    paddingBottom: 100,
  },

  card: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },

  tagline: {
    fontSize: 14,
    marginTop: 6,
  },

  description: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },

  readMore: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 6,
  },

  stats: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 5,
  },

  ratingIcon: {
    fontSize: 14,
  },

  voteIcon: {
    fontSize: 14,
  },

  statValue: {
    fontSize: 14,
    fontWeight: "700",
  },

  statLabel: {
    fontSize: 12,
  },

  upvoteButton: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  upvoteText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },

  sortLabel: {
    fontSize: 14,
    marginRight: 2,
  },

  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
  },

  sortText: {
    fontSize: 13,
    fontWeight: "600",
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