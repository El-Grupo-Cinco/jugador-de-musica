import { Sound } from "@/objets/sound";
import { API_KEY, SOUND_URL } from "./API_KEY";

export async function getSound(id: string) {
  try {
    const response = await fetch(`${SOUND_URL}${id}`, {
      method: "GET",
      headers: {
        Authorization: API_KEY,
      },
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const json = await response.json();

    return new Sound(
      json.id,
      json.url,
      json.name,
      json.tags,
      json.description,
      json.category,
      json.duration,
      json.string,
      json.username,
      json.images
    );
  } catch (error) {
    console.log("====================================");
    console.log("Error fetching sound: " + error.message);
    console.log("====================================");
    return null;
  }
}
