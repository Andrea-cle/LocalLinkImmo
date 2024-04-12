import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  // Utilisation de useState pour gérer l'état du menu (ouvert ou fermé)
  const [menuOpen, setMenuOpen] = useState(false);

  // Fonction pour basculer l'état du menu (ouvert ou fermé)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <header>
        {/* Menu burger */}
        <div className="burger-menu" onClick={toggleMenu}>
          {/* Menu de navigation */}
          <nav className={`menu ${menuOpen ? "active" : ""}`}>
            <ul>
              {/* Utilisation de Link pour les liens */}
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/signup">Inscription</Link>
              </li>
              <li>
                <Link to="/signin">Connexion</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
