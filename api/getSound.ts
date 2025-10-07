import { Sound } from "@/objects/sound";
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
      json.previews["preview-hq-mp3"],
      json.name,
      json.tags,
      json.description,
      json.category,
      json.duration,
      json.created,
      json.username,
      json.images.waveform_l
    );
  } catch (error) {
    console.log("====================================");
    console.log(
      "Error fetching sound: " +
        (error instanceof Error ? error.message : String(error))
    );
    console.log("====================================");
    return null;
  }
}
