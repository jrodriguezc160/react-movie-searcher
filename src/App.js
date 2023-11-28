import React from 'react';
import DarkTheme from './temaOscuro';
import MoviesApp from './components/MoviesApp';

function App() {
  return (
    <>
      <DarkTheme btn=".dark-theme-btn" classDark="dark-mode" />
      <div className="content-x-nomargin" style={{ marginTop: '4vh' }}>
        <h1>Ejercicios con React</h1>
        <hr />
      </div>
      <MoviesApp />
    </>
  );
}

export default App;