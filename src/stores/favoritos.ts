import { create } from "zustand";

import { Favorites } from "../types/types";



const useFavoritesStore = create<Favorites>((set) => ({
  favorites: [],
  setFavorites: (favorites) => set({ favorites }),
  addFavorite: (favorite) =>
    set((state) => ({ favorites: [...state.favorites, favorite] })),
  removeFavorite: (ISBN) =>
    set((state) => ({
      favorites: state.favorites.filter((favorite) => favorite.ISBN !== ISBN),
    })),
}));

export default useFavoritesStore;
