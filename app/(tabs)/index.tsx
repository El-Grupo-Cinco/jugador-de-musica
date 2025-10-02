import { StyleSheet, View } from "react-native";

import { getSound } from "@/api/getSound";
import { searchByQuery } from "@/api/searchByQuery";
import SoundSuggestion from "@/components/soundSuggestion";
import { ThemedView } from "@/components/themed-view";
import { SoundSearchResult } from "@/objects/searchResult";
import { useQueryStore, useSoundStore } from "@/store/store";
import { useState } from "react";

export default function HomeScreen() {
  const query = useQueryStore((store) => store.query);
  const setQuery = useQueryStore((store) => store.setQuery);
  const [soundSuggestions, setSoundSuggestions] = useState<SoundSearchResult[]>(
    []
  );

  const sound = useSoundStore((store) => store.sound);
  const setSound = useSoundStore((store) => store.setSound);

  //CODE FOR TESTING PURPOSES TODO remove till next comment
  let ljud: Array<SoundSearchResult>;
  let id: string;

  const getSoundList = async () => {
    ljud = await searchByQuery("guitar");
    id = ljud[0].id;
    setSoundSuggestions(ljud);
    console.log("====================================");
    console.log(ljud);
    console.log("====================================");
  };

  let songOne;
  const getTheSong = async () => {
    songOne = await getSound("756577");
    setSound(songOne);
    console.log("=========FIRST SONG IN LIST=========");
    console.log(songOne);
    console.log("====================================");
  };

  getSoundList().then(() => getTheSong());

  return (
    <View>
      <ThemedView style={styles.titleContainer}>
        <View>
          {soundSuggestions.map((soundSuggestion) => (
            <SoundSuggestion
              title={soundSuggestion.name}
              artist={soundSuggestion.username}
              spectrogram={
                "https://cdn.freesound.org/displays/772/772425_16646233_spec_L.jpg"
              }
              previewUrl="https://freesound.org/people/Adventide/sounds/772425/"
            />
          ))}
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  suggestionsContainer: {
    width: "100%",
  },
});
