import { getSound } from "@/api/getSound";
import { getSuggestions } from "@/api/getSuggestions";
import SearchBar from "@/components/searchbar";
import SoundSuggestion from "@/components/soundSuggestion";
import { Sound } from "@/objects/sound";
import { useQueryStore } from "@/store/store";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Keyboard, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const query = useQueryStore((store) => store.query);
  const setQuery = useQueryStore((store) => store.setQuery);
  const [soundSuggestions, setSoundSuggestions] = useState<Sound[]>([]);

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (query.trim() !== "") {
      router.push({
        pathname: "/search",
        params: { searchQuery: query },
      });
    }
  };

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
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
      />

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
