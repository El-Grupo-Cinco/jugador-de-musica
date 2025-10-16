import { getSound } from "@/api/getSound";
import { searchByQuery } from "@/api/searchByQuery";
import SearchBar from "@/components/searchbar";
import SoundSuggestion from "@/components/soundSuggestion";
import { SoundSearchResult } from "@/objects/searchResult";
import { Sound } from "@/objects/sound";
import { useQueryStore } from "@/store/store";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function SearchPage() {
  const query = useQueryStore((state) => state.query);
  const setQuery = useQueryStore((state) => state.setQuery);
  const [searchResult, setSearchResult] = useState<Sound[] | null>(null);
  const [infoText, setInfoText] = useState(
    "Search for a sound in the search bar above"
  );
  const { searchQuery } = useLocalSearchParams<{ searchQuery: string }>();

  const searchSound = async () => {
    const result: SoundSearchResult[] = await searchByQuery(query);

    const soundPromises = result.map((suggestion) => getSound(suggestion.id));
    const soundList = await Promise.all(soundPromises);

    // Filter out nulls
    const validSounds = soundList.filter(
      (sound): sound is Sound => sound !== null
    );

    setSearchResult(validSounds);
    setInfoText(`Sounds found for "${query}":`);
  };

  useEffect(() => {
    if (!query) {
      setInfoText("Search for a sound in the search bar above");
      setSearchResult(null);
      return;
    }

    searchSound();
  }, [searchQuery]);

  return (
    <View style={styles.main}>
      <Text style={styles.introText}>
        Here you can find any sound you would like.{"\n"}Good or bad, useful or
        utter nonsense — you’ll probably find it here.
      </Text>

      <SearchBar query={query} setQuery={setQuery} handleSubmit={searchSound} />

      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.introText}>{infoText}</Text>

        {searchResult && searchResult.length > 0
          ? searchResult.map((sound) => (
              <SoundSuggestion key={sound.id} suggestionSound={sound} />
            ))
          : query !== "" && (
              <Text style={styles.noResultText}>No results found.</Text>
            )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#0b0b0b",
    flex: 1,
  },
  introText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "800",
  },
  scrollView: {
    backgroundColor: "#902CD8",
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
    padding: 10,
    paddingBottom: 150,
  },
  noResultText: {
    color: "#fff",
    fontStyle: "italic",
    marginTop: 20,
  },
});
