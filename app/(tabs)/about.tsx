import { ThemedText } from "@/components/themed-text";
import { View, StyleSheet } from "react-native";

export default function AboutPage() {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        🎧 About The SoundPlayer
      </ThemedText>

      <ThemedText style={styles.paragraph}>
        Welcome to <ThemedText type="subtitle">The SoundPlayer</ThemedText> —
        where rhythm meets innovation! We’re a team of four music-loving
        software engineers on a mission to make discovering, playing, and
        feeling sound more exciting than ever.
      </ThemedText>

      <ThemedText style={styles.paragraph}>
        👨‍🚀 <ThemedText type="subtitle">Domingos</ThemedText> — The visionary
        behind the groove. He dreams in beats, codes in melodies, and somehow
        makes the impossible sound smooth.
      </ThemedText>

      <ThemedText style={styles.paragraph}>
        🧠 <ThemedText type="subtitle">Ninis</ThemedText> — The code architect.
        If something runs fast, clean, and bug-free, you can bet Ninis had
        something to do with it.
      </ThemedText>

      <ThemedText style={styles.paragraph}>
        🎨 <ThemedText type="subtitle">Zever</ThemedText> — The creative
        maestro. He designs pixels that dance and interfaces that sing. If it
        looks good, it’s Zever’s magic at work.
      </ThemedText>

      <ThemedText style={styles.paragraph}>
        🧩 <ThemedText type="subtitle">Franklin</ThemedText> — The problem
        solver. When the code hits a sour note, Franklin tunes it back to
        perfection like the beauty of Mona Lisa.
      </ThemedText>

      <ThemedText style={styles.paragraph}>
        Together, we are <ThemedText type="subtitle">The SoundPlayer Crew</ThemedText>.
        Our mission? To turn your everyday listening into an experience — one
        click, one sound, and one vibe at a time.
      </ThemedText>

      <ThemedText style={styles.footer}>
        🚀 Keep vibing. Keep playing. Keep coding the sound.
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
  },
  footer: {
    marginTop: 20,
    fontStyle: "italic",
    textAlign: "center",
  },
});
