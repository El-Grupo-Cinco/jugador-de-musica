import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  // const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            header: () => (
              <Image
                style={{
                  width: "100%",
                  height: undefined,
                  aspectRatio: 1,
                }}
                source={require("../assets/images/sound-player-logo.png")}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
