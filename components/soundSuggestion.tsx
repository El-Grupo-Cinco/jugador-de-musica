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

// see comment about rewind sound automatically in music player line 52
// soundSuggestion will not rewind automatically since we didn't manage to
// globalize useAudioPlayerStatus
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
  const [isActive, setIsActive] = React.useState(false);

  const newPlayer = useAudioPlayer(suggestionSound.url, {
    updateInterval: 100,
    downloadFirst: true,
  });

  const handlePlayBtn = async () => {
    if (isPlaying) {
      if (player) player.pause();
    }
    setSound(suggestionSound);

    setPlayer(newPlayer);

    // Read directly from the store otherwise zustand isn't quick enough to setIt just as "player" (so we really create a "third" instance)
    await useSoundStore.getState().player.play();

    setIsPlaying(true);
  };

  const handlePauseBtn = () => {
    useSoundStore.getState().player.pause();
    setIsPlaying(false);
  };

  const handleTitleArtist = async () => {
    // added to fix issues on mobiles, probably due to some lag when usin expo-go
    if (sound === suggestionSound) {
      router.navigate("/musicplayer");
    } else {
      if (player) player.pause();
      player?.seekTo(0);
      setIsPlaying(false);
      setPlayer(newPlayer);
      setSound(suggestionSound);
      router.navigate("/musicplayer");
    }
  };

  const playOrPauseBtn = () => {
    if (sound === suggestionSound && isPlaying) {
      return true;
    }
    if (sound !== suggestionSound) {
      return false;
    }
  };

  React.useEffect(() => {
    if (sound === suggestionSound) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [sound]);

  const activeBorder = () => {
    if (isActive) return { borderWidth: 2, borderColor: "white" };
    return { borderWidth: 2 };
  };

  return (
    <View>
      <ImageBackground
        source={{ uri: suggestionSound.spectrogram }}
        style={[styles.container, activeBorder()]}
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
