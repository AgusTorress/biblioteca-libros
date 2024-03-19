import { book } from "../types/types";
import { IoIosCloseCircle } from "react-icons/io";
interface Props {
  libro: book;
  hideModal: () => void;
}

export const Modal = ({ libro, hideModal }: Props) => {
  const librosAutor = libro.author.otherBooks;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center animate-appearance-in">
      <div className="relative flex items-center justify-between md:w-[700px] 2xl:w-[1000px] p-12 gap-12 bg-[#111]/40 shadow-xl">
        <img
          src={libro.cover}
          alt="bookImg"
          className="rounded-xl h-96 shadow-xl"
        />
        <div className="flex flex-col items-center justify-start h-96 gap-3 p-5">
          <h1 className="text-xl font-bold text-amber-400 drop-shadow-xl">
            {libro.title}
          </h1>
          <div>
            <p>
              <span className="font-semibold text-amber-400"> Sinopsis: </span>
              {libro.synopsis}
            </p>
            <p>
              <span className="font-semibold text-amber-400">Género:</span>{" "}
              {libro.genre}
            </p>
            <p>
              <span className="font-semibold text-amber-400">
                Cantidad de páginas:
              </span>{" "}
              {libro.pages}
            </p>
            <p>
              {" "}
              <span className="font-semibold text-amber-400">Autor:</span>{" "}
              {libro.author.name}
            </p>
            <p>
              {" "}
              <span className="font-semibold text-amber-400">ISBN:</span>{" "}
              {libro.ISBN}
            </p>
          </div>
          {librosAutor.length > 0 && (
            <div className="flex flex-col w-full italic font-sans">
              <p className=" text-amber-400">Otros libros del autor:</p>
              <ul className="pl-2">
                {librosAutor.map((libroAutor) => {
                  return <li>{libroAutor}</li>;
                })}
              </ul>
            </div>
          )}
        </div>
        <button
          className="absolute top-0 right-0 m-2 text-3xl text-amber-400 rounded-lg"
          onClick={hideModal}
        >
          <IoIosCloseCircle />
        </button>
      </div>
    </div>
  );
};
