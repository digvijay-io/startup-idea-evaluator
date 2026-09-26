import AsyncStorage from "@react-native-async-storage/async-storage";
import { StartupIdea } from "../types/idea";

const IDEAS_KEY = "@startup_ideas";

export async function saveIdeas(ideas:StartupIdea[]) {
    await AsyncStorage.setItem(IDEAS_KEY, JSON.stringify(ideas));
}

export async function loadIdeas() : Promise<StartupIdea[]>{
    const data = await AsyncStorage.getItem(IDEAS_KEY);

    if(!data){
        return [];
    }

    try{
        const parsedData = JSON.parse(data);
        return Array.isArray(parsedData) ? parsedData : [];
    } catch{
        return[];
    }
}

const THEME_KEY = "@app_theme";

export async function saveTheme(isDark:boolean) {
    await AsyncStorage.setItem(
        THEME_KEY,
        JSON.stringify(isDark)
    );
}

export async function loadTheme() : Promise<boolean> {
    const data = await AsyncStorage.getItem(THEME_KEY);

    if(data === null){
        return false;
    }

    try{
        return JSON.parse(data) === true;
    }catch{
        return false;
    }
}