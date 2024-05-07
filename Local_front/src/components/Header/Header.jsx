import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./header.scss";

const Header = () => {
  // Utilisation de l'état local pour gérer l'ouverture/fermeture du menu
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isConnect, setIsConnect] = useState(false); //Etat de connexion
  const [userRole, setUserRole] = useState(""); //Etat de connexion de l'admin
  const [isUpdateBar, setIsUpdateBar] = useState("");

  // Utilisation du hook useNavigate pour la navigation dans l'application React Router
  const navigate = useNavigate();

  // Fonction pour basculer l'état du menu entre ouvert et fermé
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleUpdate = () => {
    setIsUpdateBar((prev) => !prev); // Inverse l'état de isUpdateBar pour forcer le rechargement
  };

  // Actualisation de la navbar

  useEffect(() => {
    // Verifie le role de l'utilisateur
    const role = window.localStorage.getItem("Role");
    setUserRole(role ? role : ""); //Verifie si le role de l'admin ici c'est "3"

    setIsConnect(role !== null);
  }, [isUpdateBar]); // Ajout comme dépendance pour recharger lorsque l'envoie des identifiants est fait

  // Deconnexion : supprimer toutes les infos stoker dans le localStorage
  const handleDisconnect = () => {
    window.localStorage.clear();
    setIsConnect(false);
    setUserRole("");
    toggleUpdate();
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

          {userRole == "" && (
            <NavLink
              to={"/sign-up"}
              className={({ isActive }) => (isActive ? "active" : "none")}
              role="menuitem"
            >
              <i className="fa-solid fa-right-to-bracket" />
              Inscription
            </NavLink>
          )}

          {/*Condition que si le role dans localStorage n'est pas egal à 3 on affiche pas les lignes 80  a 87*/}

          {userRole == "3" && (
            <NavLink
              to={"/adminDash"}
              className={({ isActive }) => (isActive ? "active" : "none")}
              role="menuitem"
            >
              <i className="fa-solid fa-list-check" />
              Dashboard Admin
            </NavLink>
          )}

          {/*Permet de comparer le 2 et le 3 et ensuite faire le &&*/}
          {(userRole == "2" || userRole == "3") && (
            <NavLink
              to={"/ownerDashboard"}
              className={({ isActive }) => (isActive ? "active" : "none")}
              role="menuitem"
            >
              <i className="fa-solid fa-list" />
              Dashboard Propriétaire
            </NavLink>
          )}

          {userRole != "" && (
            <NavLink
              to={"/login"}
              className={({ isActive }) => (isActive ? "active" : "none")}
              role="menuitem"
              onClick={handleDisconnect}
            >
              <i className="fa-solid fa-lock" />
              Déconnexion
            </NavLink>
          )}

          {userRole == "" && (
            <NavLink
              to={"/login"}
              className={({ isActive }) => (isActive ? "active" : "none")}
              role="menuitem"
            >
              <i className="fa-solid fa-lock-open" />
              Connexion
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
