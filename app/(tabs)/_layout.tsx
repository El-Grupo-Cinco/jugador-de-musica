import { Tabs } from "expo-router";
import React from "react";

import { HeadSet } from "@/assets/svg/headset";
import { Music } from "@/assets/svg/music";
import { Search } from "@/assets/svg/search";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";

export default function TabLayout() {
  const colorScheme = "dark" as const;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["dark"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: "#902CD8",
          borderTopWidth: 0, // removes the grey border
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={"white"} />
          ),
        }}
      />
      <Tabs.Screen
        name="[sound]"
        options={{
          title: "Music Player",
          tabBarIcon: ({ color }) => <Music />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <Search />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color }) => <HeadSet />,
        }}
      />
    </Tabs>
  );
}
