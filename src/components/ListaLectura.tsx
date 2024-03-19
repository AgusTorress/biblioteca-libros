import { useMemo, useRef } from "react";
import { book } from "../types/types";
import { Libro } from "./Libro";
interface Props {
  librosFavoritos: book[];
  addLibro: (libro: book) => void;
  removeLibro: (ISBN: string) => void;
  showBookInfo: (libro: book) => void;
}

export const ListaLectura = ({
  librosFavoritos,
  addLibro,
  removeLibro,
  showBookInfo
}: Props) => {
  const librosFavMemo = useMemo(() => librosFavoritos, [librosFavoritos]);
  const firstBookRef = useRef<HTMLDivElement>(null);
  const scrollToFirstBook = () => {
    if (firstBookRef.current) {
      firstBookRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="flex flex-col items-center text-center gap-y-8 bg-[#272626] md:max-h-[500px] 2xl:max-h-[800px] scroll-smooth shadow-lg py-5">
      <h1 className="2xl:text-5xl md:text-3xl font-semibold text-amber-400">
        Libros Favoritos
      </h1>
      <div className="grid grid-cols-3 gap-y-5 overflow-y-auto gap-x-5 px-5">
        {librosFavMemo.map((libro, index) => {
          return (
            <div key={libro.ISBN} ref={index === 0 ? firstBookRef : null}>
              <Libro
                isFav={true}
                libro={libro}
                addLibro={addLibro}
                removeLibro={removeLibro}
                show={true}
                showBookInfo={showBookInfo}
              />
            </div>
          );
        })}
        {
          librosFavoritos.length > 6 &&
          <div className="flex items-center justify-center">
            <button
              onClick={scrollToFirstBook}
              className="bg-[#111] text-white font-semibold text-xl border-2 rounded-xl h-fit w-fit px-2 py-4 hover:bg-[#fff] hover:text-[#111]"
            >
              Scroll to top
            </button>
          </div>
        }
      </div>
    </div>
  );
};
