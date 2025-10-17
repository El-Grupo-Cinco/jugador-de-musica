import { useSoundStore } from "@/store/store";
import { useAudioPlayerStatus } from "expo-audio";
import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  progressVisible: number;
  setProgressVisible: (visibility: number) => void;
}

const SoundProgress = ({ progressVisible, setProgressVisible }: Props) => {
  const [progress, setProgress] = React.useState(0);
  const player = useSoundStore((store) => store.player);
  const setIsPlaying = useSoundStore((store) => store.setIsPlaying);
  const playerStatus = useAudioPlayerStatus(player);

  React.useEffect(() => {
    setProgress((playerStatus.currentTime / playerStatus.duration) * 100);
    if (playerStatus.currentTime === playerStatus.duration) {
      setProgressVisible(0);
      setIsPlaying(false);
    }
  }, [playerStatus.currentTime, playerStatus.duration, setProgressVisible]);

  return (
    <View
      style={[
        styles.progressBar,
        { marginLeft: `${progress}%`, opacity: progressVisible },
      ]}
    />
  );
};

export default SoundProgress;

const styles = StyleSheet.create({
  progressBar: {
    width: 3,
    height: 60,
    marginTop: -66,
    backgroundColor: "#902CD8",
  },
});
