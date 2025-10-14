import { Sound } from "@/objects/sound";
import { API_KEY, SOUND_URL } from "./API_KEY";

export async function getSound(id: string) {
  try {
    const response = await fetch(`${SOUND_URL}${id}`, {
      method: "GET",
      headers: {
        Authorization: API_KEY,
          Accept: "application/json", // iOS requires this
          "Content-Type": "application/json", // Fixes header stripping on iOS
      },
    });

    if (!response.ok) {
      const message = await response.text();
      console.log("getSound Error:", response.status, message);
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
      console.log("getSound Exception:", error instanceof Error ? error.message : String(error));
      return null;
  }
}
