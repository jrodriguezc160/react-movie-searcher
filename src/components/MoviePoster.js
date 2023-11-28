import React from 'react';

const MoviePoster = ({ selectedMoviePoster, modalPosterOpen, closeModalPoster }) => {
  if (!selectedMoviePoster || !modalPosterOpen) return null;
  console.log('Abriendo poster...');

  return (
    <div
      className={`screen ${modalPosterOpen ? 'visible' : ''}`}
      onClick={closeModalPoster}
    >
      <div className="ambilight-modal" onClick={(e) => e.stopPropagation()}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${selectedMoviePoster.poster_path}`}
          alt="Displayed first"
          className="image"
        />
        <img
          src={`https://image.tmdb.org/t/p/w500/${selectedMoviePoster.poster_path}`}
          alt="Ambilight effect"
          className="light"
        />
      </div>
    </div>
  );
};

export default MoviePoster;