import { AudioStatus } from "expo-audio";
import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  playerStatus: AudioStatus;
  progressVisible: number;
  setProgressVisible: (visibility: number) => void;
  setIsPlaying: (isPLaying: boolean) => void;
}

const SoundProgress = ({
  playerStatus,
  progressVisible,
  setProgressVisible,
  setIsPlaying,
}: Props) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setProgress((playerStatus.currentTime / playerStatus.duration) * 100);
    if (playerStatus.currentTime === playerStatus.duration) {
      setProgressVisible(0);
      setIsPlaying(false);
    }
  }, [
    playerStatus.currentTime,
    playerStatus.duration,
    setProgressVisible,
    setIsPlaying,
  ]);

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
