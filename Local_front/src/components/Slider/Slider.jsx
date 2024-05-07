import React, { useState } from "react";
import "./slider.scss"; // Importer les styles CSS du slider
import HomePage from "../HomePage/HomePage";

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

  // Fonction pour afficher le nom alternatif des images
  const altImages = [
    "Bureau avec ordinateur et bloc-note",
    "Mains servant de toit au dessus de maisons miniatures",
    "Photo quartier pavillionnaire",
    "Photo d'un quartier d'immeuble",
    "Photo d'un ordinateur et d'une calculatrice sur un bureau",
    "Photo pile de pièces avec des plantes dessus",
    "Photo de pièces de monaies avec images de maison",
  ];
  return (
    <div className="slider">
      {/* Affichage de l'image actuelle en fonction de l'index  avec le texte alternatif qui lui ai dédié */}
      <img
        src={images[currentImageIndex]}
        alt={`${altImages[currentImageIndex]} ${currentImageIndex + 1}`}
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
