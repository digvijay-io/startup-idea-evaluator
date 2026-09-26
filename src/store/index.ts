import { configureStore } from "@reduxjs/toolkit";
import ideasReducer from "../store/slices/ideaSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    ideas: ideasReducer,
    theme : themeReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;