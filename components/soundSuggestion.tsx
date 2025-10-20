// components/SoundSuggestion.tsx
// A single sound suggestion row, styled like Freesound's suggestion list.
// Shows a spectrogram background, sound title, uploader, and play control.
// Uses Expo audio module to actually stream/play the preview mp3 from Freesound.

import { Sound } from "@/objects/sound";
import { useSoundStore } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer } from "expo-audio";
import { router } from "expo-router";
import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SoundSuggestion({
  suggestionSound,
}: {
  suggestionSound: Sound;
}) {
  const sound = useSoundStore((store) => store.sound);
  const setSound = useSoundStore((store) => store.setSound);
  const player = useSoundStore((store) => store.player);
  const setPlayer = useSoundStore((store) => store.setPlayer);
  const isPlaying = useSoundStore((store) => store.isPlaying);
  const setIsPlaying = useSoundStore((store) => store.setIsPlaying);

  const newPlayer = useAudioPlayer(suggestionSound.url, {
    updateInterval: 100,
    downloadFirst: true,
  });

  React.useEffect(() => {
    setPlayer(newPlayer);
  }, [sound]);

  const handlePlayBtn = async () => {
    if (isPlaying) {
      player.pause();
    }
    setSound(suggestionSound);

    setPlayer(newPlayer);

    // Read directly from the store otherwise zustand isn't quick enough to setIt just as "player" (so we really create a "third" instance)
    player.play();
    setIsPlaying(true);
    setProgressVisible(100);
  };

  const handlePauseBtn = () => {
    useSoundStore.getState().player.pause();
    setIsPlaying(false);
  };

  const handleTitleArtist = () => {
    // added to fix issues on mobiles, probably due to some lag when usin expo-go
    const newPlayer = useSoundStore.getState().player;
    useSoundStore.getState().player.pause;
    setSound(suggestionSound);
    router.navigate("/musicplayer");
  };

  React.useEffect(() => {
    if (suggestionSound !== sound) {
      setIsPlaying(false);
      setProgressVisible(0);
    }
  }, [sound]);

  const playOrPauseBtn = () => {
    if (sound === suggestionSound && isPlaying) {
      return true;
    }
    if (sound !== suggestionSound) {
      return false;
    }
  };

  return (
    <View>
      <ImageBackground
        source={{ uri: suggestionSound.spectrogram }}
        style={styles.container}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.textContainer}>
          {/* Titel och artist klickbara */}
          <Text
            style={styles.title}
            numberOfLines={1}
            onPress={handleTitleArtist}
          >
            {suggestionSound.name}
          </Text>
          <Text
            style={styles.artist}
            numberOfLines={1}
            onPress={handleTitleArtist}
          >
            {suggestionSound.username}
          </Text>
        </View>

        {/* Play/Pause-knapp */}
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={playOrPauseBtn() ? handlePauseBtn : handlePlayBtn}
          >
            <Ionicons
              name={playOrPauseBtn() ? "pause-circle" : "play-circle"}
              size={36}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginVertical: 6,
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    width: 300,
  },
  backgroundImage: {
    resizeMode: "cover",
    opacity: 0.85,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },
  artist: {
    color: "white",
    fontSize: 12,
    marginTop: 2,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  progressBar: {
    width: 3,
    height: 60,
    marginTop: -66,
    backgroundColor: "#902CD8",
  },
});
