import React from 'react';
import { IconoBuscar } from './Iconos';

const MovieSearchBox = (props) => {
  return (
    <>
      <IconoBuscar ancho="16px" alto="16px" />
      <input
        placeholder="ej. Avengers"
        value={props.value}
        onChange={(event) => {
          props.setSearchValue(event.target.value);
        }}
      ></input>
    </>
  );
};

export default MovieSearchBox;