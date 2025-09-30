// components/SoundSuggestion.tsx
// A single sound suggestion row, styled like Freesound's suggestion list.
// Shows a spectrogram background, sound title, uploader, and play/pause control.
// Uses Expo's AV module to actually stream/play the preview mp3 from Freesound.

import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av"; // Expo library for sound playback

// Props (data passed in for each suggestion row)
type SoundSuggestionProps = {
  title: string;          // Sound title (Freesound's "name")
  artist: string;         // Sound uploader (Freesound's "username")
  spectrogram: any;       // Spectrogram thumbnail (like Freesound preview image)
  previewUrl: string;     // URL to Freesound preview mp3 (e.g., mp3/ogg link)
};

export default function SoundSuggestion({ title, artist, spectrogram, previewUrl }: SoundSuggestionProps) {
  // Whether the sound is currently playing
  const [isPlaying, setIsPlaying] = useState(false);

  // Reference to the loaded sound (so we can play/pause/stop it)
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // 🔊 Function to start playback
  async function playSound() {
    try {
      // If we already have a sound loaded, just resume playback
      if (sound) {
        await sound.playAsync();
        setIsPlaying(true);
        return;
      }

      // Otherwise: create a new sound from the preview URL
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: previewUrl }, // stream mp3 from Freesound
        { shouldPlay: true } // auto-play as soon as it's loaded
      );

      setSound(newSound);   // store reference
      setIsPlaying(true);   // update UI state
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }

  // ⏸ Function to pause playback
  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync(); // pause but keep sound loaded
    }
    setIsPlaying(false);
  }

  // 🧹 Cleanup when component unmounts (stop and unload sound)
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync(); // free memory and stop playback
      }
    };
  }, [sound]);

  return (
    // Row container with spectrogram background image (like Freesound’s suggestion item)
    <ImageBackground
      source={spectrogram}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      {/* LEFT: title + artist info */}
      <View style={styles.textContainer}>
        {/* Sound title */}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {/* Uploader/artist */}
        <Text style={styles.artist} numberOfLines={1}>
          {artist}
        </Text>
      </View>

      {/* RIGHT: play/pause button */}
      <View style={styles.controls}>
        {isPlaying ? (
          // If currently playing: show pause button
          <TouchableOpacity onPress={pauseSound}>
            <Ionicons name="pause-circle" size={36} color="white" />
          </TouchableOpacity>
        ) : (
          // If currently paused: show play button
          <TouchableOpacity onPress={playSound}>
            <Ionicons name="play-circle" size={36} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

// 🎨 Styles for layout and appearance
const styles = StyleSheet.create({
  container: {
    height: 60,              // Same compact height as Freesound suggestion rows
    marginVertical: 6,       // Vertical gap between rows
    marginHorizontal: 12,    // Indent from screen edge
    borderRadius: 8,         // Rounded corners
    overflow: "hidden",      // Clip background to border radius
    flexDirection: "row",    // Layout: text left, controls right
    alignItems: "center",    // Vertically center all content
    paddingHorizontal: 10,   // Inner spacing
  },
  backgroundImage: {
    resizeMode: "cover",     // Fill background
    opacity: 0.85,           // Dim background so text is readable
  },
  textContainer: {
    flex: 1,                 // Take up remaining space (pushes play button right)
  },
  title: {
    color: "white",          // White text for visibility
    fontWeight: "700",       // Bold (title emphasis)
    fontSize: 14,
  },
  artist: {
    color: "white",          // White text
    fontSize: 12,            // Smaller (secondary info)
    marginTop: 2,
  },
  controls: {
    flexDirection: "row",    // Horizontal layout (can add more controls later)
    alignItems: "center",    // Center vertically
    marginLeft: 8,           // Gap from text
  },
});
