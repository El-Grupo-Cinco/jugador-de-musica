import { Sound } from "@/objets/sound";
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

    const soundList = json.results.map(
      (sound: {
        id: string;
        url: string;
        name: string;
        tags: String[];
        description: string;
        category: string;
        duration: number;
        created: string;
        username: string;
        images: object;
      }) =>
        new Sound(
          sound.id,
          sound.url,
          sound.name,
          sound.tags,
          sound.description,
          sound.category,
          sound.duration,
          sound.created,
          sound.username,
          sound.images
        )
    );

    return soundList;
  } catch (error) {
    //TODO implement elegant solution
    console.log(error.message);
  }
}
