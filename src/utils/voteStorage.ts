import AsyncStorage from "@react-native-async-storage/async-storage";

const VOTED_IDEAS_KEY = "@voted_ideas";

export async function getVotedIdeas() : Promise<string[]> {
    const data = await AsyncStorage.getItem(VOTED_IDEAS_KEY);

    if(!data){
        return[];
    }

    try {
        const parsedData = JSON.parse(data);
        return Array.isArray(parsedData) ? parsedData : [];
    }catch{
        return[];
    }
}   

export async function markIdeaAsVoted(ideaId:string) {
    const votedIdeas = await getVotedIdeas();

    if(!votedIdeas.includes(ideaId)){
        votedIdeas.push(ideaId);

        await AsyncStorage.setItem(
            VOTED_IDEAS_KEY,
            JSON.stringify(votedIdeas)
        );
    }
}