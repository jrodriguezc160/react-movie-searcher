import React, { useState, useEffect } from 'react';
import { IconoLuna, IconoSol } from './components/Iconos';

const DarkTheme = ({ classDark }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage on component mount
    const storedMode = localStorage.getItem('isDarkModeLS');
    if (storedMode === null) {
      localStorage.setItem('isDarkModeLS', 'false');
    } else {
      setIsDarkMode(storedMode === 'true');
    }
  }, []);

  const toggleDarkMode = () => {
    console.log('Changing mode...');
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('isDarkModeLS', newMode.toString());
  };

  useEffect(() => {
    // Apply dark mode class to relevant elements when isDarkMode changes
    const elements = document.querySelectorAll('[data-dark]');
    elements.forEach((el) => {
      if (isDarkMode) {
        el.classList.add(classDark);
      } else {
        el.classList.remove(classDark);
      }
    });
  }, [isDarkMode, classDark]);

  return (
    <button
      className='dark-theme-btn'
      onClick={toggleDarkMode}
    >
      {isDarkMode ? (
        <IconoSol
          ancho='16'
          alto='16'
        />
      ) : (
        <IconoLuna
          ancho='16'
          alto='16'
        />
      )}
    </button>
  );
};

export default DarkTheme;
