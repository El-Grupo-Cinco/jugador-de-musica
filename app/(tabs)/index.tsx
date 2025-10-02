import { StyleSheet, Text, View } from "react-native";

import { getSound } from "@/api/getSound";
import { getSuggestions } from "@/api/getSuggestions";
import SoundSuggestion from "@/components/soundSuggestion";
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
    ljud = await getSuggestions();
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
    <View style={styles.main}>
      <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionsTitle}>Our sound suggestions</Text>
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
