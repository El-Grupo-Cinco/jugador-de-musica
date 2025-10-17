import { Sound } from "@/objects/sound";
import { create, StateCreator } from "zustand";

interface SoundStore {
  sound: Sound | null;
  setSound: (newSound: Sound | null) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  player: any;
  setPlayer: (newPlayer: any) => void;
}

const soundStore: StateCreator<SoundStore> = (set) => ({
  sound: null,
  setSound: (newSound: Sound | null) => set({ sound: newSound }),
  isPlaying: false,
  setIsPlaying: (playing: boolean) => set({ isPlaying: playing }),
  player: null,
  setPlayer: (newPlayer: any) => set({ player: newPlayer }),
});

export const useSoundStore = create(soundStore);

const queryStore = (set: any) => ({
  query: "",
  setQuery: (newString: string) => set({ query: newString }),
});

export const useQueryStore = create(queryStore);
