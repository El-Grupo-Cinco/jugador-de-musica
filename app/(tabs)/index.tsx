import { Alert, StyleSheet, Text, View } from "react-native";

import { getSound } from "@/api/getSound";
import { getSuggestions } from "@/api/getSuggestions";
import SoundSuggestion from "@/components/soundSuggestion";
import { Sound } from "@/objects/sound";
import { useQueryStore, useSoundStore } from "@/store/store";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const query = useQueryStore((store) => store.query);
  const setQuery = useQueryStore((store) => store.setQuery);
  const [soundSuggestions, setSoundSuggestions] = useState<Sound[]>([]);

  const sound = useSoundStore((store) => store.sound);
  const setSound = useSoundStore((store) => store.setSound);

  useEffect(() => {
    const getNewSuggestions = async () => {
      try {
        const suggestions = await getSuggestions();

        if (!Array.isArray(suggestions)) {
          console.error("getSuggestions did not return an array:", suggestions);
          Alert.alert("Could not get a list of suggestion.");
          return;
        }

        const toSoundSuggestions = await Promise.all(
          suggestions.map((suggestion: Sound) => getSound(suggestion.id))
        );

        setSoundSuggestions(toSoundSuggestions);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        Alert.alert("Could not get a list of suggestion: " + err);
      }
    };

    getNewSuggestions();
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionsTitle}>Our sound suggestions</Text>
        {soundSuggestions.map((soundSuggestion) => (
          <SoundSuggestion
            key={soundSuggestion.id}
            title={soundSuggestion.name}
            artist={soundSuggestion.username}
            spectrogram={soundSuggestion.spectrogram}
            previewUrl={soundSuggestion.url}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
  suggestionsContainer: {
    width: "90%",
    backgroundColor: "#902CD8",
    alignItems: "center",
    borderRadius: 10,
    flex: 1,
    padding: 20,
  },
  suggestionsTitle: {
    color: "white",
    fontWeight: 800,
    fontSize: 20,
  },
});
