import React, { useEffect, useState } from 'react';
import MoviesList from './MoviesList';
import MovieListHeading from './MovieListHeading';
import NavBar from './NavBar';

const MoviesApp = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmRiY2QzMzRiYWI5MjViMjg5MTEwNDY1YTg4MDZkNiIsInN1YiI6IjY1NGRmM2I0NDFhNTYxMzM2YzVmYjU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HY7VrsbpUBeQtEhGzZC1NYNRrU29_KsLVW-NmyH_8EU',
      },
    };

    // Para las películas, su información y su id
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=es-ES&page=1`;
    const response = await fetch(url, options);
    const responseJSON = await response.json();

    if (responseJSON.results) {
      setMovies(responseJSON.results);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites =
      JSON.parse(localStorage.getItem('react-movie-app-favourites')) || [];

    setFavourites(movieFavourites);
  }, []);

  const handleFavouritesClick = (movie) => {
    // Verifica si la película ya está en la lista de favoritos
    const isFavorite = favourites.some(
      (favoriteMovie) => favoriteMovie.id === movie.id
    );

    if (isFavorite) {
      // Si la película ya es un favorito, la eliminamos de la lista
      const newFavouriteList = favourites.filter(
        (favorite) => favorite.id !== movie.id
      );
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    } else {
      // Si la película no es un favorito, la añadimos a la lista
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    }
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  return (
    <>
      <NavBar searchValue={searchValue} setSearchValue={setSearchValue} />

      <div
        style={{
          display: 'block',
          padding: '0',
          margin: '0',
          maxHeight: 'fit-content',
        }}
      >
        <div className="content" style={{ marginTop: '0', marginBottom: "0" }}>
          <MovieListHeading heading={searchValue} body="" />
        </div>
        <MoviesList
          movies={movies}
          handleFavouritesClick={handleFavouritesClick}
          lista={'busqueda'}
          favourites={favourites}
        />
        <MoviesList
          movies={favourites}
          handleFavouritesClick={handleFavouritesClick}
          lista={'favoritos'}
          favourites={favourites}
        />
      </div>
    </>
  );
};

export default MoviesApp;