import React, { useState } from "react";
import "./slider.scss"; // Importer les styles CSS du slider

const Slider = ({ images }) => {
  // Utilisation de useState pour gérer l'index de l'image actuellement affichée
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fonction pour passer à la diapositive suivante
  const nextSlide = () => {
    const newIndex = (currentImageIndex + 1) % images.length; // Calcul de l'index de la prochaine image
    setCurrentImageIndex(newIndex); // Mise à jour de l'état avec le nouvel index
  };

  // Fonction pour passer à la diapositive précédente
  const prevSlide = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length; // Calcul de l'index de l'image précédente
    setCurrentImageIndex(newIndex); // Mise à jour de l'état avec le nouvel index
  };

  return (
    <div className="slider">
      {/* Affichage de l'image actuelle en fonction de l'index courant */}
      <img
        src={images[currentImageIndex]}
        alt={`Slide ${currentImageIndex + 1}`}
      />

      {/* Bouton pour passer à la diapositive précédente */}
      <button className="prev-btn" onClick={prevSlide}>
        &#10094; {/* Flèche gauche Unicode */}
      </button>

      {/* Bouton pour passer à la diapositive suivante */}
      <button className="next-btn" onClick={nextSlide}>
        &#10095; {/* Flèche droite Unicode */}
      </button>
    </div>
  );
};

export default Slider;
