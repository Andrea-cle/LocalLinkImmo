import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./header.scss";

const Header = () => {
  // Utilisation de l'état local pour gérer l'ouverture/fermeture du menu
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Utilisation du hook useNavigate pour la navigation dans l'application React Router
  const navigate = useNavigate();

  // Fonction pour basculer l'état du menu entre ouvert et fermé
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className="header"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="header-title">
        <h1>Local Link Immo</h1>
        <h2>Simplifiez la gestion de votre Patrimoine Immobilier</h2>
      </div>
      <div className={`navbar ${isMenuOpen ? "active" : ""}`} role="menubar">
        {/*aria-haspopup="true" => indique qu'il y a un menu associé à ce bouton */}
        {/*aria-expanded={isMenuOpen} => indique si le menu est ouvert ou fermé */}
        <div
          className="menu-icon"
          onClick={toggleMenu}
          role="button"
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
        >
          <FaBars />
        </div>
        <nav role="menu">
          {/* Liens de navigation vers différentes sections de l'application */}
          {/* role="menuitem" => indique que chaque lien est un élément du menu */}
          <NavLink
            exact={"true"}
            to={"/"}
            className={({ isActive }) => (isActive ? "active" : "none")}
            role="menuitem"
          >
            <i className="fa-solid fa-house" />
            Accueil
          </NavLink>
          <NavLink
            to={"/sign-up"}
            className={({ isActive }) => (isActive ? "active" : "none")}
            role="menuitem"
          >
            <i className="fa-solid fa-right-to-bracket" />
            Inscription
          </NavLink>
          <NavLink
            to={"/login"}
            className={({ isActive }) => (isActive ? "active" : "none")}
            role="menuitem"
          >
            <i className="fa-solid fa-unlock-keyhole" />
            Connexion
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
