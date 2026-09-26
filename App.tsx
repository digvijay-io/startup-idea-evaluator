import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { store } from "./src/store";
import RootNavigator from "./src/navigation/RootNavigator";
import { useAppDispatch } from "./src/store/hooks";
import { useEffect } from "react";
import { loadIdeas, loadTheme } from "./src/utils/storage";
import { setIdeas } from "./src/store/slices/ideaSlice";
import { setDarkMode } from "./src/store/slices/themeSlice";

export default function App() {
  function AppContent() {
    const dispatch = useAppDispatch();

    useEffect(() => {
      const initializeApp = async () => {
        const [savedIdeas, savedTheme] = await Promise.all([
          loadIdeas(),
          loadTheme(),
        ]);

        dispatch(setIdeas(savedIdeas));
        dispatch(setDarkMode(savedTheme));
      };

      initializeApp();
    }, [dispatch]);

    return (
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}
