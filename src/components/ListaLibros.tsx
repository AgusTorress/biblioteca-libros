import { useEffect, useRef, useState } from "react";
import { book } from "../types/types";
import { Libro } from "./Libro";
import { Slider, SliderValue, Input } from "@nextui-org/react";

interface Props {
  listaLibros: book[];
  librosFav: book[];
  addLibro: (libro: book) => void;
  removeLibro: (ISBN: string) => void;
  listaLibrosKey: number;
  showBookInfo: (libro: book) => void;
}

export const ListaLibros = ({
  listaLibros,
  librosFav,
  addLibro,
  removeLibro,
  listaLibrosKey,
  showBookInfo
}: Props) => {
  const [librosFiltradosPorValor, setLibrosFiltradosPorValor] =
    useState(listaLibros);
  const [librosFiltradosPorInput, setLibrosFiltradosPorInput] =
    useState(listaLibros);
  /* const [filtroTextoPorInput, setFiltroTextoPorInput] = useState(false);
  const [filtroTextoPorValor, setFiltroTextoPorValor] = useState(false); */
  const firstBookRef = useRef<HTMLDivElement>(null);

  const scrollToFirstBook = () => {
    if (firstBookRef.current) {
      firstBookRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getMaxPages = (libros: book[]) => {
    return libros.reduce((max, libro) => {
      return libro.pages > max ? libro.pages : max;
    }, 0);
  };

  useEffect(() => {
    setLibrosFiltradosPorInput(listaLibros);
    setLibrosFiltradosPorValor(listaLibros);
  }, [listaLibros]);

  const filterBooksByValue = (value: SliderValue) => {
    const [min, max] = value
      .toString()
      .split(",")
      .map((numero) => parseInt(numero));
    setLibrosFiltradosPorValor(
      listaLibros.filter((libro) => libro.pages >= min && libro.pages <= max)
    );
    /* setFiltroTextoPorValor(true); */
  };

  const filterByTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  /*   if (value === "") {
      setFiltroTextoPorInput(false);
    } */
    setLibrosFiltradosPorInput(
      listaLibros.filter((libro) =>
        libro.title.toLowerCase().includes(value.toLowerCase())
      )
    );
    /* setFiltroTextoPorInput(true); */
  };

  const intersectionArrays = (arr1: book[], arr2: book[]) => {
    return arr1.filter((libro) => arr2.includes(libro));
  };

  return (
    <div
      key={listaLibrosKey}
      className="flex flex-col items-center text-center gap-y-8 bg-[#272626] md:max-h-[500px] 2xl:max-h-[800px] scroll-smooth shadow-lg py-5"
    >
      <h1 className="2xl:text-5xl md:text-3xl font-semibold  text-amber-400">
        Libros
      </h1>
      {listaLibros.length > 0 && (
        <div className="w-full  flex justify-between px-12">
          <Slider
            onChangeEnd={filterBooksByValue}
            label="Máximo de páginas"
            step={1}
            maxValue={getMaxPages(listaLibros)}
            minValue={0}
            defaultValue={[0, getMaxPages(listaLibros)]}
            color="foreground"
            className="w-52"
          ></Slider>
          <Input
            type="text"
            className="w-52"
            color="default"
            variant="bordered"
            onChange={filterByTitle}
          />
        </div>
      )}
      <div className="grid grid-cols-3 gap-y-5 overflow-y-auto gap-x-5 px-5">
        {intersectionArrays(
          librosFiltradosPorInput,
          librosFiltradosPorValor
        ).map((libro, index) => {
          return (
            <div key={libro.ISBN} ref={index === 0 ? firstBookRef : null}>
              <Libro
                libro={libro}
                isFav={librosFav.some(
                  (libroFav) => libroFav.ISBN === libro.ISBN
                )}
                addLibro={addLibro}
                removeLibro={removeLibro}
                show={true}
                showBookInfo={showBookInfo}
              />
            </div>
          );
        })}
        {intersectionArrays(librosFiltradosPorInput, librosFiltradosPorValor)
          .length > 6 && (
          <div className="flex items-center justify-center">
            <button
              onClick={scrollToFirstBook}
              className="bg-[#111] text-white font-semibold text-md border-2 rounded-xl h-fit w-fit px-2 py-4 hover:bg-[#fff] hover:text-[#111]"
            >
              Desliza hacia arriba
            </button>
          </div>
        )}
      </div>
        {intersectionArrays(librosFiltradosPorInput, librosFiltradosPorValor)
          .length === 0 && (
          <div className="flex items-center justify-center w-full">
            <h1 className="text-amber-400 font-semibold text-xl">
              No hay libros que cumplan con los filtros 😢
            </h1>
          </div>
        )}
    </div>
  );
};
