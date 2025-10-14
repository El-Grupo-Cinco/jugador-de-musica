import { SoundSearchResult } from "@/objects/searchResult";
import { StyleSheet } from "react-native";
import { API_KEY, SEARCH_URL } from "./API_KEY";

export async function searchByQuery(query: string) {
  try {
    const response = await fetch(`${SEARCH_URL}${query}&page_size=20`, {
      method: "GET",
      headers: {
        Authorization: API_KEY,
        Accept: "application/json", // iOS compatibility
        "Content-Type": "application/json", // Fixes header stripping on iOS
      },
    });
    if (!response.ok) {
      const message: string = await response.text();
      console.log("searchByQuery Error:", response.status, message);
      throw new Error(message);
    }

    const json = await response.json();

    if (!json.results || json.results === 0) {
      throw new Error("No sound result returned.");
    }

    const soundResultList = json.results.map(
      (sound: {
        id: string;
        name: string;
        tags: string[];
        license: string;
        username: string;
      }) =>
        new SoundSearchResult(
          sound.id,
          sound.name,
          sound.tags,
          sound.license,
          sound.username
        )
    );

    return soundResultList;
  } catch (error) {
    console.log(
      "searchByQuery Exception:",
      error instanceof Error ? error.message : String(error)
    );
    return [];
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    padding: 20,
  },
  introText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: 800,
  },
  suggestionsContainer: {
    width: "100%",
    backgroundColor: "#902CD8",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
  },
  suggestionsTitle: {
    color: "white",
    fontWeight: "800",
    fontSize: 20,
  },
});
