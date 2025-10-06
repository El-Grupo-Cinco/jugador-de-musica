// components/SoundSuggestion.tsx
// A single sound suggestion row, styled like Freesound's suggestion list.
// Shows a spectrogram background, sound title, uploader, and play control.
// Uses Expo's AV module to actually stream/play the preview mp3 from Freesound.

import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SoundSuggestionProps = {
  title: string;
  artist: string;
  spectrogram: any;
  previewUrl: string;
};

export default function SoundSuggestion({
  title,
  artist,
  spectrogram,
  previewUrl,
}: SoundSuggestionProps) {
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

  return (
    <ImageBackground
      source={spectrogram}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {artist}
        </Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={playSound}>
          <Ionicons name="play-circle" size={36} color="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginVertical: 6,
    marginHorizontal: 12,
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
