import React, { useEffect } from 'react';
import '../styles/MagicClickEffect.css'; // Ajuste o caminho conforme a estrutura de seu projeto

const MagicClickEffect = () => {
  useEffect(() => {
    const handleClick = (event) => {
      const magicStar = document.createElement('div');
      magicStar.className = 'magic-star';
      magicStar.style.left = `${event.clientX}px`;
      magicStar.style.top = `${event.clientY}px`;
      document.body.appendChild(magicStar);

      setTimeout(() => {
        magicStar.remove();
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
};

export default MagicClickEffect;
