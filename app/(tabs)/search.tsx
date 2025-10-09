import { getSound } from "@/api/getSound";
import { searchByQuery } from "@/api/searchByQuery";
import SearchBar from "@/components/searchbar";
import SoundSuggestion from "@/components/soundSuggestion";
import { SoundSearchResult } from "@/objects/searchResult";
import { Sound } from "@/objects/sound";
import { useQueryStore } from "@/store/store";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function SearchPage() {
  const query = useQueryStore((state) => state.query);
  const setQuery = useQueryStore((state) => state.setQuery);
  const [searchResult, setSearchResult] = useState(null);
  const [infoText, setInfoText] = useState(
    "Search for a sound in the search bar above"
  );

  useEffect(() => {
    if (!query) {
      setInfoText("Search for a sound in the search bar above");
      return;
    }
    const searchSound = async () => {
      const result: SoundSearchResult[] = await searchByQuery(query);
      const soundPromises = result.map((suggestion) => {
        return getSound(suggestion.id);
      });
      const soundList: Sound[] = await Promise.all(soundPromises);
      //since get sound can return null the "null Sound" are filtered otherwise an error shows when setting soundSUggestions
      const validSounds: Sound = soundList.filter(
        (sound): sound is Sound => sound !== null
      );
      setSearchResult(validSounds);
      setInfoText(`Sound found for the query "${query}":`);
    };
    searchSound();
  }, [query]);

  return (
    <View style={styles.main}>
      <Text style={styles.introText}>
        Here you can find any you sound you'd like.{"\n"}Good or bad, usefull or
        utter nonsense you most likely will find it.
      </Text>
      <SearchBar query={query} setQuery={setQuery} />

      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.introText}>{infoText}</Text>
        {searchResult.map((sound: Sound) => (
          <SoundSuggestion key={sound.id} suggestionSound={sound} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    padding: 5,
  },
  introText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: 800,
  },
  scrollView: {
    backgroundColor: "#902CD8",
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
    padding: 5,
    paddingBottom: 150,
  },
});
