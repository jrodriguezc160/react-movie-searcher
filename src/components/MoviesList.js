import React, { useState } from 'react';
import { IconoCorazon, IconoMax } from './Iconos';
import MovieInfo from './MovieInfo';
import MoviePoster from './MoviePoster';

const MoviesList = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMoviePoster, setSelectedMoviePoster] = useState(null);
  const [modalPosterOpen, setModalPosterOpen] = useState(false);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMovie(null);
  };

  // Poster
  const openModalPoster = (movie, selectedMovie, modalOpen) => {
    !modalOpen
      ? setSelectedMoviePoster(movie)
      : setSelectedMoviePoster(selectedMovie);

    setModalPosterOpen(true);
  };

  const closeModalPoster = () => {
    setModalPosterOpen(false);
    setSelectedMoviePoster(null);
  };

  return (
    <>
      <MovieInfo
        selectedMovie={selectedMovie}
        modalOpen={modalOpen}
        favourites={props.favourites}
        handleFavouritesClick={props.handleFavouritesClick}
        closeModal={closeModal}
        openModalPoster={openModalPoster}
      />
      <MoviePoster
        selectedMoviePoster={selectedMoviePoster}
        modalPosterOpen={modalPosterOpen}
        closeModalPoster={closeModalPoster}
      />

      <div
        style={{
          margin: '0',
          padding: '0',
          height: '400px',
          top: '0',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {props.lista === 'busqueda' ? (
          <p
            className="content"
            style={{
              top: '0',
              position: 'relative',
              zIndex: '15',
              padding: '0',
              marginTop: '0',
            }}
          >
            Hay {props.movies.length} resultados:
          </p>
        ) : (
          <h2
            className="content"
            style={{ top: '3vh', position: 'relative', zIndex: '15' }}
          >
            Favoritos
          </h2>
        )}

        <div className="movies-container" style={{ margin: '0', padding: '0' }}>
          <div className="margen-manual">&nbsp;</div>
          {!props.movies || props.movies.length === 0 ? (
            <div
              style={{
                position: 'relative',
                margin: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p>¡Vaya! Parece que no hay nada por aquí...</p>
            </div>
          ) : (
            props.movies &&
            props.movies.map((movie, index) => (
              <div className="movie-item" key={index}>
                <div className="iconos">
                  <div
                    className="me-gusta"
                    onClick={() => props.handleFavouritesClick(movie)}
                  >
                    <IconoCorazon
                      ancho="16px"
                      alto="16px"
                      esFavorito={
                        props.favourites &&
                        props.favourites.some(
                          (favourite) => favourite.id === movie.id
                        )
                      }
                    />
                  </div>
                  <div
                    className="ver-info"
                    onClick={() => openModalPoster(movie)}
                  >
                    <IconoMax ancho="16px" alto="16px" />
                  </div>
                </div>
                <div className="ambilight" onClick={() => openModal(movie)}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="Displayed first"
                    className="image"
                  />
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="Ambilight effect"
                    className="light"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MoviesList;