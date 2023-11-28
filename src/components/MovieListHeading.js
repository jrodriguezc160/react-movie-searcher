import React from 'react';

const MovieListHeading = (props) => {
  return (
    <div>
      <h2>{props.heading}</h2>
      {props.body}
    </div>
  );
};

export default MovieListHeading;