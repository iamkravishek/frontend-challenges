
import { client } from "./client";

export const SuggestionService = {
    getSuggestions(query:string, signal?:AbortSignal){
        return client.get(`/sug?s=${query}&max=5`,signal)
    }
};