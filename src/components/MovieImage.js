import React, { useState, useEffect } from 'react';

const MovieImage = React.memo((props) => {
  const [imageLink, setImageLink] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    // Create an AbortController
    const controller = new AbortController();
    const signal = controller.signal;

    // Function to fetch movie images
    const fetchMovieImages = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmRiY2QzMzRiYWI5MjViMjg5MTEwNDY1YTg4MDZkNiIsInN1YiI6IjY1NGRmM2I0NDFhNTYxMzM2YzVmYjU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HY7VrsbpUBeQtEhGzZC1NYNRrU29_KsLVW-NmyH_8EU',
        },
        signal, // Pass the signal to the fetch options
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${props.movieID}/images`,
          options
        );
        const data = await response.json();

        // Verificar si 'data' no es nulo y tiene la propiedad 'backdrops'
        if (data && data.backdrops) {
          const backdrops = data.backdrops;

          if (backdrops.length > 0) {
            // Seleccionamos una imagen aleatoria entre el primer y el quinto resultado
            const randomIndex = Math.floor(
              Math.random() * Math.min(backdrops.length, 5)
            );
            const selectedImage = backdrops[randomIndex];

            if (selectedImage) {
              setImageLink(
                `https://image.tmdb.org/t/p/original${selectedImage.file_path}`
              );
            } else {
              console.error('La imagen seleccionada es nula');
              setError(true);
            }
          } else {
            console.error('La longitud de backdrops es 0');
            setError(true);
          }
        } else {
          console.error(
            'La respuesta de la API no tiene la propiedad backdrops'
          );
          setError(true);
        }
      } catch (err) {
        // Check if it's an aborted error
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error(err);
          setError(true);
        }
      }
    };

    // Call the fetch function
    fetchMovieImages();

    // Cleanup function to cancel the fetch request when the component unmounts
    return () => {
      controller.abort(); // Abort the fetch request when unmounting
    };
  }, [props.movieID]);

  if (error) {
    return <></>;
  }

  return (
    <>
      {imageLink && (
        <div style={{ position: 'relative' }}>
          {' '}
          <img
            src={imageLink}
            alt="Cover"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '0.5rem',
              zIndex: '68',
            }}
          />
          <div className="div-degradado"></div>
        </div>
      )}
    </>
  );
});

export default MovieImage;