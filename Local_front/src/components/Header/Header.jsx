import React from "react";
import "./header.scss";

// Permet de gérer l'entête de la page d'accueil
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/home.png" alt="Logo de Local Link Immo" />
      </div>
      <div className="header_content">
        <h1>Local Link Immo </h1>
        <h3> Site d'autogestion de vos propres biens immobiliers</h3>
      </div>
    </header>
  );
};

export default Header;
