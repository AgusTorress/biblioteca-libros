import { book } from "../types/types";

import { FaHeart } from "react-icons/fa";
import { useState } from "react";
interface Props {
  libro: book;
  isFav: boolean;
  addLibro: (libro: book) => void;
  removeLibro: (ISBN: string) => void;
  show: boolean;
  showBookInfo: (libro: book) => void;
}

export const Libro = ({ libro, addLibro, removeLibro, show, isFav, showBookInfo }: Props) => {
  const [isFavorite, setIsFavorite] = useState(isFav);

  const manageTextLarge = (text: string) => {
    if (text.length > 15) {
      return text.slice(0, 15) + "...";
    }
    return text;
  }

  return (
    <div className="h-fit bg-[#353535] p-3 flex flex-col shadow-xl rounded-xl items-center justify-center " >
      <div className="gap-y-1 flex flex-col items-center hover:scale-105 hover:cursor-pointer">
        <h1
          className="2xl:text-lg sm:text-base font-semibold text-center text-amber-400"
          key={libro.ISBN}
        >
          {manageTextLarge(libro.title)}
        </h1>
        <button onClick={() => showBookInfo(libro)}>
          <img src={libro.cover} className="max-h-52 shadow-2xl " alt={libro.title} />
        </button>
      </div>
      <div className="flex w-full items-center justify-center text-xl pt-4 gap-3">
        {!isFavorite && show ? (
          <button
            onClick={() => {
              addLibro(libro);
              setIsFavorite(true);
            }}
            className="text-white bg-black px-3 py-3 rounded-full hover:text-amber-400 hover:scale-125"
          >
            <FaHeart />
          </button>
        ) : (
          show && (
            <button
              className="hover:text-white bg-black px-3 py-3 rounded-full text-amber-400 hover:scale-125"
              onClick={() => {
                removeLibro(libro.ISBN);
                setIsFavorite(false);
              }}
            >
              <FaHeart />
            </button>
          )
        )}
      </div>
    </div>
  );
};
