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
      <section className="home_navigate">
        <nav>
          <ul>
            <li>
              <a href="#">
                <i className="fa-solid fa-house" />
                Accueil
              </a>
            </li>
            <li>
              <a href="#utilisateur ">
                <i className="fa-solid fa-right-to-bracket" />
                Utilisateur
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-keyboard" />
                En savoir plus
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
