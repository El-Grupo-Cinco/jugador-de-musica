import { ThemedText } from "@/components/themed-text";
import { ScrollView, StyleSheet, View } from "react-native";

export default function AboutPage() {
  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View style={styles.suggestionsContainer}>
        <ThemedText style={styles.suggestionsTitle}>
          🎧 About The SoundPlayer
        </ThemedText>

        <ThemedText style={styles.introText}>
          Welcome to <ThemedText type="subtitle">The SoundPlayer</ThemedText> —
          where rhythm meets innovation! We’re a team of four music-loving
          software engineers on a mission to make discovering, playing, and
          feeling sound more exciting than ever.
        </ThemedText>

        <ThemedText style={styles.introText}>
          👨‍🚀 <ThemedText type="subtitle">Domingos</ThemedText> — The visionary
          behind the groove. He dreams in beats, codes in melodies, and somehow
          makes the impossible sound smooth.
        </ThemedText>

        <ThemedText style={styles.introText}>
          🧠 <ThemedText type="subtitle">Ninis</ThemedText> — The code
          architect. If something runs fast, clean, and bug-free, you can bet
          Ninis had something to do with it.
        </ThemedText>

        <ThemedText style={styles.introText}>
          🎨 <ThemedText type="subtitle">Zever</ThemedText> — The creative
          maestro. He designs pixels that dance and interfaces that sing. If it
          looks good, it’s Zever’s magic at work.
        </ThemedText>

        <ThemedText style={styles.introText}>
          🧩 <ThemedText type="subtitle">Franklin</ThemedText> — The problem
          solver. When the code hits a sour note, Franklin tunes it back to
          perfection.
        </ThemedText>

        <ThemedText style={styles.introText}>
          Together, we are{" "}
          <ThemedText type="subtitle">The SoundPlayer Crew</ThemedText>. Our
          mission? To turn your everyday listening into an experience — one
          click, one beat, and one vibe at a time.
        </ThemedText>

        <ThemedText style={styles.introText}>
          🚀 Keep vibing. Keep playing. Keep coding the sound.
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    padding: 20,
  },
  introText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  suggestionsContainer: {
    width: "100%",
    backgroundColor: "#902CD8",
    alignItems: "center",
    borderRadius: 10,
    flex: 1,
    padding: 20,
  },
  suggestionsTitle: {
    color: "white",
    fontWeight: "800",
    fontSize: 20,
  },
});
