import React, { useState, useEffect } from 'react';
import MovieTrailer from './MovieTrailer';
import { IconoCerrar, IconoCorazon, IconoMax } from './Iconos';
import MovieImage from './MovieImage';

const MovieInfo = ({
  selectedMovie,
  modalOpen,
  favourites,
  handleFavouritesClick,
  closeModal,
  openModalPoster,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const [movieDetails, setMovieDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);
  const [guionista, setGuionista] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Ajusta el tiempo de espera según tus necesidades

    return () => clearTimeout(timeoutId);
  }, [selectedMovie]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const detailsOptions = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmRiY2QzMzRiYWI5MjViMjg5MTEwNDY1YTg4MDZkNiIsInN1YiI6IjY1NGRmM2I0NDFhNTYxMzM2YzVmYjU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HY7VrsbpUBeQtEhGzZC1NYNRrU29_KsLVW-NmyH_8EU',
        },
      };

      const creditsOptions = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmRiY2QzMzRiYWI5MjViMjg5MTEwNDY1YTg4MDZkNiIsInN1YiI6IjY1NGRmM2I0NDFhNTYxMzM2YzVmYjU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HY7VrsbpUBeQtEhGzZC1NYNRrU29_KsLVW-NmyH_8EU',
        },
      };

      try {
        const detailsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedMovie.id}?language=en-US`,
          detailsOptions
        );
        const detailsData = await detailsResponse.json();
        setMovieDetails(detailsData);

        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedMovie.id}/credits?language=en-US`,
          creditsOptions
        );
        const creditsData = await creditsResponse.json();
        setCast(creditsData.cast);

        const directorResult = creditsData.crew.filter(
          (crewMember) =>
            crewMember.department === 'Directing' &&
            crewMember.job === 'Director'
        );

        const guionistaResult = creditsData.crew.filter(
          (crewMember) =>
            crewMember.department === 'Writing' &&
            crewMember.job === 'Screenplay'
        );

        setDirector(directorResult);
        setGuionista(guionistaResult);

        console.log('Cast:', creditsData.cast);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedMovie) {
      fetchMovieDetails();
    }
  }, [selectedMovie]);

  if (!selectedMovie || !modalOpen) return null;

  const actoresPrincipales =
    (cast &&
      cast
        .slice(0, 3)
        .map((actor) => actor.name)
        .join(', ')) ||
    'No disponible';

  console.log('Abriendo la información de la película...');

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div
      className={`screen ${modalOpen ? 'visible' : ''}`}
      onClick={() => closeModal()}
    >
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            margin: 'auto',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1>Loading...</h1>
        </div>
      )}

      <div
        className={`modal ${isLoading ? 'invisible-modal' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-image">
          <MovieImage movieID={selectedMovie.id} />
        </div>

        <div className="top-info">
          <div className="movie-item">
            <div className="ambilight">
              <div className="iconos">
                <div
                  className="me-gusta"
                  onClick={() => handleFavouritesClick(selectedMovie)}
                >
                  <IconoCorazon
                    ancho="16px"
                    alto="16px"
                    esFavorito={
                      favourites &&
                      favourites.some(
                        (favourite) => favourite.id === selectedMovie.id
                      )
                    }
                  />
                </div>
                <div
                  className="ver-info"
                  onClick={() => openModalPoster(selectedMovie)}
                >
                  <IconoMax ancho="16px" alto="16px" />
                </div>
              </div>
              <img
                src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
                alt="Displayed first"
                className="image"
              />
              <img
                src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
                alt="Ambilight effect"
                className="light"
              />
            </div>
            <MovieTrailer movieID={selectedMovie.id} />
          </div>
          <div className="modal-info">
            <h2 style={{ top: '0', fontSize: '32px' }}>
              {selectedMovie.title}
            </h2>
            <p>
              <i>{selectedMovie.original_title}</i>
            </p>
            <p>
              {selectedMovie.release_date.slice(0, 4)} ·{' '}
              {movieDetails.genres
                ? movieDetails.genres.map((genre) => genre.name).join(' · ')
                : 'No disponible'}{' '}
              · {movieDetails.runtime && `${movieDetails.runtime}min`}
            </p>
            <p>
              Dirección:&nbsp;
              {director && director.length > 0
                ? director.map((d) => d.name).join(', ')
                : 'No disponible'}
            </p>
            <p>
              Guión:&nbsp;
              {guionista && guionista.length > 0
                ? guionista.map((d) => d.name).join(', ')
                : 'No disponible'}
            </p>
            <p>Reparto principal: {actoresPrincipales}</p>

            {window.innerWidth < 856 ? (
              !isHidden ? (
                <div>
                  <p style={{ wordBreak: 'break-word', textAlign: 'left' }}>
                    {selectedMovie.overview}
                  </p>
                  <button onClick={toggleVisibility}>Ver menos</button>
                </div>
              ) : (
                <div>
                  <button onClick={toggleVisibility}>Ver más</button>
                </div>
              )
            ) : (
              <p style={{ wordBreak: 'break-word', textAlign: 'left' }}>
                {selectedMovie.overview}
              </p>
            )}
          </div>
        </div>
        <div className="cerrar-modal" onClick={() => closeModal()}>
          <IconoCerrar ancho="16px" alto="16px" />
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;