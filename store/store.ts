import { Sound } from "@/objects/sound";
import { create, StateCreator } from "zustand";

interface SoundStore {
  sound: Sound | null;
  setSound: (newSound: Sound | null) => void;
}

const soundStore: StateCreator<SoundStore> = (set) => ({
  sound: null,
  setSound: (newSound: Sound | null) => set({ sound: newSound }),
});

export const useSoundStore = create(soundStore);

const queryStore = (set: any) => ({
  query: "",
  setQuery: (newString: string) => set({ query: newString }),
});

export const useQueryStore = create(queryStore);
