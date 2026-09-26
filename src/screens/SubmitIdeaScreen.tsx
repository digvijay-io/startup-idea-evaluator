import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";

import React, { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "../store/hooks";

import { generateRating } from "../utils/generateRating";

import { addIdea } from "../store/slices/ideaSlice";

import { saveIdeas } from "../utils/storage";

import { useNavigation } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../navigation/RootNavigator";

import { useAppTheme } from "../theme/useAppTheme";

const SubmitIdeaScreen = () => {
  const dispatch = useAppDispatch();

  const ideas = useAppSelector((state) => state.ideas.ideas);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { theme } = useAppTheme();

  const [name, setName] = useState("");

  const [tagline, setTagline] = useState("");

  const [description, setDescription] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Please enter an idea name.");
      setSuccess("");
      return;
    }

    if (!tagline.trim()) {
      setError("Please enter a tagline.");
      setSuccess("");
      return;
    }

    if (!description.trim()) {
      setError("Please enter a description.");
      setSuccess("");
      return;
    }

    setError("");

    const newIdea = {
      id: Date.now().toString(),
      name: name.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      rating: generateRating(),
      voteCount: 0,
      createdAt: new Date().toISOString(),
    };

    const updatedIdeas = [...ideas, newIdea];

    dispatch(addIdea(newIdea));

    await saveIdeas(updatedIdeas);

    setSuccess("Your idea was submitted!");

    setName("");
    setTagline("");
    setDescription("");

    setTimeout(() => {
      navigation.navigate("MainTabs", {
        screen: "Ideas",
      });
    }, 800);
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
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
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
            Create an Idea
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            Share your startup idea with the community.
          </Text>

          {/* Idea Name */}

          <View style={styles.field}>
            <Text
              style={[
                styles.label,
                {
                  color: theme.text,
                },
              ]}
            >
              Idea Name
            </Text>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
              placeholder="e.g. Quickkart"
              placeholderTextColor={theme.muted}
              value={name}
              onChangeText={(value) => {
                setName(value);
                setError("");
              }}
            />
          </View>

          {/* Tagline */}

          <View style={styles.field}>
            <Text
              style={[
                styles.label,
                {
                  color: theme.text,
                },
              ]}
            >
              Tagline
            </Text>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
              placeholder="A faster way to shop locally"
              placeholderTextColor={theme.muted}
              value={tagline}
              onChangeText={(value) => {
                setTagline(value);
                setError("");
              }}
            />
          </View>

          {/* Description */}

          <View style={styles.field}>
            <Text
              style={[
                styles.label,
                {
                  color: theme.text,
                },
              ]}
            >
              Description
            </Text>

            <TextInput
              style={[
                styles.input,
                styles.description,
                {
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
              placeholder="Tell us about your startup idea..."
              placeholderTextColor={theme.muted}
              multiline
              textAlignVertical="top"
              value={description}
              onChangeText={(value) => {
                setDescription(value);
                setError("");
              }}
            />
          </View>

          {/* Error */}

          {error ? (
            <Text
              style={[
                styles.error,
                {
                  color: theme.danger,
                },
              ]}
            >
              {error}
            </Text>
          ) : null}

          {/* Success */}

          {success ? (
            <Text
              style={[
                styles.success,
                {
                  color: theme.primary,
                },
              ]}
            >
              {success}
            </Text>
          ) : null}

          {/* Submit */}

          <Pressable
            style={[
              styles.button,
              {
                backgroundColor: theme.primary,
              },
            ]}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit Idea</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SubmitIdeaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  keyboard: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 15,
    marginTop: 8,
    marginBottom: 30,
  },

  field: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    fontSize: 15,
  },

  description: {
    height: 150,
    paddingTop: 16,
  },

  error: {
    fontSize: 13,
    marginBottom: 12,
  },

  button: {
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  success: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
});
