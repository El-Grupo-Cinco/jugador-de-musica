import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Text } from "react-native";

export default function SongPage() {
  //const textColor = useThemeColor({}, "text")
  //return <Text style={{color:textColor}}>Music player here</Text>;
  return <ThemedText>Music player here</ThemedText>
}
