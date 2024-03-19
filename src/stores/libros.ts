import { create } from "zustand";

import { Libros } from "../types/types";


const useLibrosStore = create<Libros>((set) => ({
  libros: [],
  setLibros: (libros) => set({ libros }),
  addLibro: (libro) => set((state) => ({ libros: [...state.libros, libro] })),
  removeLibro: (ISBN) =>
    set((state) => ({
      libros: state.libros.filter((libro) => libro.ISBN !== ISBN),
    })),
}));

export default useLibrosStore;
