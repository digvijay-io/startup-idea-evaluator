import { useAppSelector } from "../store/hooks"
import { darkTheme, lightTheme } from "./theme";

export const useAppTheme = () => {
    const isDark = useAppSelector(
        (state) => state.theme.isDark
    );

    const theme = isDark ? darkTheme : lightTheme;

    return{
        theme,
        isDark,
    };
};