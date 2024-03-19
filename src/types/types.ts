export type  author = {
    name: string,
    otherBooks: string[]
}


export type  book = {
    title: string,
    pages: number,
    cover: string,
    genre: string,
    synopsis: string,
    year: number,
    ISBN: string,
    author: author
}

export type Libros = {
  libros: book[];
  setLibros: (libros: book[]) => void;
  addLibro: (libro: book) => void;
  removeLibro: (ISBN: string) => void;
}



export type Favorites = {
    favorites: book[];
    setFavorites: (favorites: book[]) => void;
    addFavorite: (favorite: book) => void;
    removeFavorite: (ISBN: string) => void;
  }