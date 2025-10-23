// app/(tabs)/musicplayer.tsx
import { PauseButton } from "@/assets/svg/pauseBtn";
import { PlayButton } from "@/assets/svg/playBtn";
import { ThemedText } from "@/components/themed-text";
import { useSoundStore } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayerStatus } from "expo-audio";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_W } = Dimensions.get("window");

export default function MusicPlayer() {
  const insets = useSafeAreaInsets();
  const sound = useSoundStore((s) => s.sound);
  const player = useSoundStore((store) => store.player);
  const isPlaying = useSoundStore((store) => store.isPlaying);
  const setIsPlaying = useSoundStore((store) => store.setIsPlaying);
  const [progress, setProgress] = React.useState(0);

  if (!sound) {
    return (
      <View>
        <ThemedText style={styles.noSound}>
          Music Player not available right now.
        </ThemedText>
        <ThemedText style={styles.noSoundInfo}>
          No sound loaded, select one i our suggestions or search for one and
          come back.
        </ThemedText>
      </View>
    );
  }

  const status = useAudioPlayerStatus(player);

  const [progressVisible, setProgressVisible] = React.useState(0);

  React.useEffect(() => {
    setProgressVisible(status?.currentTime !== 0 ? 100 : 0);
  }, [status?.currentTime]);

  //this useEffect rewind the sound back to 0 (start of sound)
  //will also work in soundSuggestion once music player has been mounted
  //however if user does not mount music player (i.e navigate to sound player) the sound suggestion will not rewind
  React.useEffect(() => {
    setProgress((status.currentTime / status.duration) * 100);
    if (status.didJustFinish) {
      player.seekTo(0);
      player.pause();
      setProgressVisible(0);
      setIsPlaying(false);
    }
  }, [status.currentTime, status.duration, setProgressVisible]);

  const togglePlay = () => {
    try {
      if (!status.isLoaded) {
        useSoundStore.getState().player.play();
        setIsPlaying(true);
      } else if (isPlaying) {
        useSoundStore.getState().player.pause();
        setIsPlaying(false);
      } else {
        useSoundStore.getState().player.play();
        setIsPlaying(true);
      }
    } catch (e) {
      console.warn("Playback error:", e);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: 18, // lämnar plats under den globala headern
          paddingBottom: insets.bottom + 90, // så navbaren inte täcker innehåll
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.center}>
        <Text style={styles.trackTitle} numberOfLines={2}>
          {sound?.name ?? "Unknown track"}
        </Text>
        <Text style={styles.trackArtist} numberOfLines={1}>
          {sound?.username ?? "Unknown artist"}
        </Text>
        <Text style={styles.trackArtist}>Description:</Text>
        <ScrollView
          style={styles.descriptionContainer}
          contentContainerStyle={{ paddingBottom: 20 }}
          nestedScrollEnabled={true}
        >
          <Text style={styles.description}>{sound?.description}</Text>
        </ScrollView>
      </View>

      {/* bred vågformsbild (responsive) */}
      <View style={styles.waveformWrap}>
        {sound?.spectrogram ? (
          <View>
            <Image
              source={{ uri: sound.spectrogram }}
              style={styles.waveformImage}
              resizeMode="cover"
            />
            {isPlaying && (
              <View
                style={[
                  styles.progressBar,
                  { marginLeft: `${progress}%`, opacity: progressVisible },
                ]}
              />
            )}
          </View>
        ) : (
          <View style={styles.waveformPlaceholder} />
        )}
      </View>

      {/* Controls */}
      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => {
            player.seekTo(0);
            if (!isPlaying) {
              player.play();
              setIsPlaying(true);
            }
          }}
        >
          <Ionicons name="play-skip-back-outline" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => player.seekTo(player.currentTime - 5)}
        >
          <Ionicons name="play-back-outline" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlay} style={styles.playBtn}>
          {isPlaying ? <PauseButton size={36} /> : <PlayButton size={36} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => player.seekTo(player.currentTime + 5)}
        >
          <Ionicons name="play-forward-outline" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => player.seekTo(sound?.duration || 0)}
        >
          <Ionicons name="play-skip-forward-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.sectionTitle}>Sound Player</Text>
      </View>

      <View style={styles.tagsRow}>
        {(sound?.tags ?? ["Tag", "Tag"])
          .slice(0, 6)
          .map((t: string, i: number) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{t}</Text>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}

const PURPLE = "#902CD8";
const DARK = "#0b0b0b";
const CARD = "#1a1a1a";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: DARK,
    minHeight: "100%",
  },
  center: {
    alignItems: "center",
    width: "100%",
  },
  albumWrap: {
    width: 220,
    height: 220,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: CARD,
  },
  albumImage: {
    width: "100%",
    height: "100%",
  },
  albumPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: { color: "#aaa" },

  trackTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 12,
  },
  trackArtist: {
    color: "#e2d6ff",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 6,
  },

  waveformWrap: {
    width: "100%",
    marginTop: 22,
    alignItems: "center",
  },
  waveformImage: {
    width: Math.min(SCREEN_W - 40, 1100),
    height: 60,
    borderRadius: 8,
    marginBottom: 6,
  },
  waveformPlaceholder: {
    width: Math.min(SCREEN_W - 40, 1100),
    height: 60,
    borderRadius: 8,
    backgroundColor: "#2d133d",
  },

  controlsRow: {
    marginTop: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "92%",
    paddingHorizontal: 12,
  },
  iconBtn: {
    padding: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#3a3a3a",
    alignItems: "center",
    justifyContent: "center",
  },
  playBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: PURPLE,
    alignItems: "center",
    justifyContent: "center",
  },

  metaRow: {
    marginTop: 14,
    alignItems: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontWeight: "700",
  },

  tagsRow: {
    marginTop: 14,
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tag: {
    backgroundColor: "#222",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    margin: 4,
  },
  tagText: { color: "#ddd", fontSize: 12 },
  descriptionContainer: {
    paddingHorizontal: 15,
    borderColor: PURPLE,
    borderWidth: 2,
    borderRadius: 5,
    padding: 2,
    maxHeight: 150,
  },
  description: {
    color: "#e2d6ff",
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
  },
  progressBar: {
    width: 3,
    height: 60,
    marginTop: -66,
    backgroundColor: "#902CD8",
  },
  noSound: {
    marginTop: 40,
    textAlign: "center",
    backgroundColor: "#902CD8",
    fontWeight: 800,
    padding: 10,
  },
  noSoundInfo: {
    textAlign: "center",
    backgroundColor: "#902CD8",
    fontWeight: 800,
    padding: 10,
  },
});
