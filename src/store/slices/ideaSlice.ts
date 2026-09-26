import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StartupIdea } from "../../types/idea";

type IdeasState = {
  ideas: StartupIdea[];
};

const initialState: IdeasState = {
  ideas: [],
};

const ideasSlice = createSlice({
  name: "ideas",
  initialState,
  reducers: {
    addIdea: (state, action: PayloadAction<StartupIdea>) => {
      state.ideas.push(action.payload);
    },

    upvoteIdea: (state, action: PayloadAction<string>) => {
      const idea = state.ideas.find(
        (item) => item.id === action.payload
      );

      if (idea) {
        idea.voteCount += 1;
      }
    },

    setIdeas : (state, action : PayloadAction<StartupIdea[]>) => {
      state.ideas = action.payload;
    },

  },
});

export const { addIdea, upvoteIdea, setIdeas } = ideasSlice.actions;

export default ideasSlice.reducer;