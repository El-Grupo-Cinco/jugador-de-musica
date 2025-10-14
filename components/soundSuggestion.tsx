// components/SoundSuggestion.tsx
// A single sound suggestion row, styled like Freesound's suggestion list.
// Shows a spectrogram background, sound title, uploader, and play control.
// Uses Expo audio module to actually stream/play the preview mp3 from Freesound.

import { Sound } from "@/objects/sound";
import { useSoundStore } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SoundProgress from "./SoundProgress";

export default function SoundSuggestion({
  suggestionSound,
}: {
  suggestionSound: Sound;
}) {
  const sound = useSoundStore((store) => store.sound);
  const setSound = useSoundStore((store) => store.setSound);

  const player = useAudioPlayer(sound?.url, {
    updateInterval: 100,
    downloadFirst: true,
  });

  const playerStatus = useAudioPlayerStatus(player);
  const [progressVisible, setProgressVisible] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlayBtn = () => {
    setSound(suggestionSound);
    player.play();
    setIsPlaying(true);
    setProgressVisible(100);
  };

  const handlePauseBtn = () => {
    player.pause();
    setIsPlaying(false);
  };

  // Keep UI in sync if playback stops or ends
  React.useEffect(() => {
    if (playerStatus === "ended" || playerStatus === "stopped") {
      setIsPlaying(false);
      setProgressVisible(0);
    }
  }, [playerStatus]);

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
            onPress={isPlaying ? handlePauseBtn : handlePlayBtn}
          >
            {suggestionSound.name}
          </Text>
          <Text
            style={styles.artist}
            numberOfLines={1}
            onPress={isPlaying ? handlePauseBtn : handlePlayBtn}
          >
            {suggestionSound.username}
          </Text>
        </View>

        {/* Play/Pause-knapp */}
        <View style={styles.controls}>
          <TouchableOpacity onPress={isPlaying ? handlePauseBtn : handlePlayBtn}>
            <Ionicons
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={36}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Progressbar */}
      <SoundProgress
        playerStatus={playerStatus}
        progressVisible={progressVisible}
        setProgressVisible={(visibility: number) => setProgressVisible(visibility)}
      />
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
});


/*
const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🔊 Play sound
  async function playSound() {
    try {
      // If a sound is already playing, stop it first
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
      }

      // Load and play a new sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: previewUrl },
        { shouldPlay: true }
      );

      // When the sound finishes, reset UI
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (
          status &&
          status.isLoaded &&
          "isPlaying" in status &&
          "didJustFinish" in status &&
          !status.isPlaying &&
          status.didJustFinish
        ) {
          setIsPlaying(false);
        }
      });

      setSound(newSound);
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }

  // 🧹 Cleanup
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);
*/
