import { Alert, StyleSheet, Text, View } from "react-native";

import { getSound } from "@/api/getSound";
import { getSuggestions } from "@/api/getSuggestions";
import SoundSuggestion from "@/components/soundSuggestion";
import { Sound } from "@/objects/sound";
import { useQueryStore } from "@/store/store";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const query = useQueryStore((store) => store.query);
  const setQuery = useQueryStore((store) => store.setQuery);
  const [soundSuggestions, setSoundSuggestions] = useState<Sound[]>([]);

  useEffect(() => {
    const getNewSuggestions = async () => {
      try {
        const suggestions = await getSuggestions();

        if (!Array.isArray(suggestions)) {
          console.error("getSuggestions did not return an array:", suggestions);
          Alert.alert("Could not get a list of suggestion.");
          return;
        }

        const promises = suggestions.map((suggestion) =>
          getSound(suggestion.id)
        );
        const converted = await Promise.all(promises);

        //since get sound can return null the "null Sound" are filtered otherwise an error shows when setting soundSUggestions
        const validSounds = converted.filter(
          (sound) => sound !== null
        ) as Sound[];

        setSoundSuggestions(validSounds);
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
            suggestionSound={soundSuggestion}
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
  },
  suggestionsTitle: {
    color: "white",
    fontWeight: 800,
    fontSize: 20,
  },
});
