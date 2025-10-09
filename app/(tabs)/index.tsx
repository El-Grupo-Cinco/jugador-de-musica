import { getSound } from "@/api/getSound";
import { getSuggestions } from "@/api/getSuggestions";
import SearchBar from "@/components/searchbar";
import SoundSuggestion from "@/components/soundSuggestion";
import { Sound } from "@/objects/sound";
import { useQueryStore } from "@/store/store";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

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
      {/* Intro Text */}
      <Text style={styles.introText}>
        The Sound Player: Where good taste meets questionable noises.{"\n"}
      </Text>

      {/* SearchBar */}
      <SearchBar query={query} setQuery={setQuery} />

      {/* Suggestions Box */}
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
    padding: 20,
  },
  introText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
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
