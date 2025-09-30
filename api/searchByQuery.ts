import { SoundSearchResult } from "@/objets/searchesult";
import { API_KEY, SEARCH_URL } from "./API_KEY";

export async function searchByQuery(query: string) {
  try {
    const response = await fetch(`${SEARCH_URL}${query}`, {
      method: "GET",
      headers: {
        Authorization: API_KEY,
      },
    });
    if (!response.ok) {
      const message: string = await response.text();
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
    //TODO implement elegant solution
    console.log(error.message);
  }
}
