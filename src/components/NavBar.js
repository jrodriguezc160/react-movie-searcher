import React, { useState } from 'react';
import MovieSearchBox from './MovieSearchBox';

export default function NavBar(props) {
  const [isHidden, setIsHidden] = useState(true);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="navbar-wrap">
      <div className="navbar">
        <ul>
          <li onClick={() => window.innerWidth < 862 && toggleVisibility()}>
            {window.innerWidth < 862 ? (
              <a>
                <img
                  src="%PUBLIC_URL%/logo512.png"
                  alt="react-logo"
                  style={{ width: '16px', height: '16px' }}
                />
              </a>
            ) : (
              <a href="/index.html">
                <img
                  src="%PUBLIC_URL%/logo512.png"
                  alt="react-logo"
                  style={{ width: '16px', height: '16px' }}
                />
              </a>
            )}
          </li>

          <li className={`hideable ${isHidden ? 'hidden' : ''}`}>
            <a href="../../public/index.html">Inicio</a>
          </li>

          <li className={`hideable ${isHidden ? 'hidden' : ''}`}>
            <a
              href="https://github.com/jrodriguezc160"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>

          <li className={`hideable ${isHidden ? 'hidden' : ''}`}>
            <a
              href="https://youtube.com/playlist?list=PLvq-jIkSeTUZ5XcUw8fJPTBKEHEKPMTKk&si=xMuFHd3DRzHfmupu"
              target="_blank"
              rel="noreferrer"
            >
              Curso React
            </a>
          </li>
        </ul>
        <div className={`${isHidden ? 'search' : 'search on-vertical-menu'}`}>
        <MovieSearchBox
          searchValue={props.searchValue}
          setSearchValue={props.setSearchValue}
        />
        </div>
      </div>
    </div>
  );
}