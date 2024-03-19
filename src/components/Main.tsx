import Library from "../data/books.json";
import { useEffect, useState } from "react";
import { book } from "../types/types";
import { ListaLibros } from "./ListaLibros";
import { ListaLectura } from "./ListaLectura.tsx";
import { Modal } from "./Modal.tsx";

export const Main = () => {
  const [libreria, setLibreria] = useState<book[]>([]);
  const [librosFavoritos, setLibrosFavoritos] = useState<book[]>([]);
  const [listaLibrosKey, setListaLibrosKey] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalBook, setModalBook] = useState<book>();
  useEffect(() => {
    const books = Library.library.map((libro) => libro.book);
    localStorage.setItem("libros", JSON.stringify(books));
    setLibreria(books);

    const libros_fav = localStorage.getItem("libros_fav");
    console.log(libros_fav);
    if (libros_fav != null) {
      setLibrosFavoritos(JSON.parse(libros_fav));
    }
  }, []);

  useEffect(() => {
    if (librosFavoritos) {
      const books = Library.library.map((libro) => libro.book);
      setLibreria(books);
    }
  }, [librosFavoritos]);

  const addLibroFavs = (libro: book) => {
    if (librosFavoritos.some((libroFav) => libroFav.ISBN === libro.ISBN))
      return;
    const newBooksFav = [...librosFavoritos, libro];
    setLibrosFavoritos(newBooksFav);
    localStorage.setItem("libros_fav", JSON.stringify(newBooksFav));
    //console.log(newBooksFav);
  };

  const eliminarLibroFav = (ISBN: string) => {
    if (librosFavoritos.length === 0) return;
    const librosNuevos = librosFavoritos.filter((libro) => libro.ISBN !== ISBN);
    setLibrosFavoritos(librosNuevos);
    localStorage.setItem("libros_fav", JSON.stringify(librosNuevos));
    setListaLibrosKey((prevKey) => prevKey + 1);
  };

  const showBookInfo = (libro: book) => {
    setShowModal(true);
    setModalBook(libro);
    const contenido = document.querySelector("#content");
    contenido?.classList.add("borroso");
  };

  const hideModal = () => {
    setShowModal(false);
    setModalBook(undefined);
    const contenido = document.querySelector("#content");
    contenido?.classList.remove("borroso");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-3 px-16 h-full">
      {showModal && modalBook && (
        <Modal hideModal={hideModal} libro={modalBook} />
      )}
      <div className="font-bold text-5xl text-white">Biblioteca Riki-Riki</div>
      <div className="w-full grid grid-cols-2 grid-rows-1 gap-x-4" id="content">
        <ListaLibros
          librosFav={librosFavoritos}
          listaLibrosKey={listaLibrosKey}
          listaLibros={libreria}
          addLibro={addLibroFavs}
          removeLibro={eliminarLibroFav}
          showBookInfo={showBookInfo}
        />

        <ListaLectura
          librosFavoritos={librosFavoritos}
          addLibro={addLibroFavs}
          removeLibro={eliminarLibroFav}
          showBookInfo={showBookInfo}
        />
      </div>
    </div>
  );
};
