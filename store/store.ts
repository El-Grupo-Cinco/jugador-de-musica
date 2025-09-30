import { create } from "zustand";

const soundStore = (set: any) => ({
  sound: null,
  setSound: (newSound: any) => set({ sound: newSound }),
});

export const useSoundStore = create(soundStore);

const queryStore = (set: any) => ({
  query: "",
  setQuery: (newString: string) => set({ query: newString }),
});

export const useQueryStore = create(queryStore);
