import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const.js";
import "./navbar.scss";

const Navbar = () => {
  // Utilisation de useState pour gérer l'état du menu (ouvert ou fermé)
  const [menuOpen, setMenuOpen] = useState(false);
  const [isConnect, setIsConnect] = useState(false); //Etat de connexion
  const [isAdmin, setIsAdmin] = useState(false); //Etat de connexion de l'admin

  // Fonction pour basculer l'état du menu (ouvert ou fermé)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Actualisation de la navbar

  useEffect(() => {
    // Vérifie dans le localStorage si l'utilisateur est connecté
    const token = window.localStorage.getItem("token");
    setIsConnect(!!token); //Convertit en booléen (TRUE ou FALSE)

    // Verifie le role de l'utilisateur
    const role = window.localStorage.getItem("role");
    setIsAdmin(role === "3"); //Verifie si le role de l'admin ici c'est "3"
  }, []);

  // Deconnexion : supprimer toutes les infos stoker dans le localStorage
  const handleDisconnect = () => {
    window.localStorage.clear();
    setIsConnect(false);
  };

  return (
    <div className="navbar">
      <header>
        {/* Menu burger */}
        <div className="burger-menu" onClick={toggleMenu}>
          {/* Menu de navigation */}
          <nav className={`menu ${menuOpen ? "active" : ""}`}>
            <ul>
              <li>
                {/* Utilisation de Link pour les liens */}
                <Link to="/">Accueil</Link>
              </li>

              <li>
                {/*En fonction de la presence ou non du localstorage et du token le bouton inscription doit se transformer en DASHBOARD si ADMIN role 3*/}

                {isConnect && isAdmin ? (
                  <Link to={APP_ROUTES.DASHBOARD}>Dashboard</Link>
                ) : (
                  <Link to={APP_ROUTES.SIGN_UP}>Inscription</Link>
                )}
              </li>

              <li>
                {/*En fonction de la presence ou non du localstorage et du token le bouton connexion se transforme en bouton DECONNEXION*/}
                {isConnect ? (
                  <Link to="/" onClick={handleDisconnect}>
                    Déconnexion
                  </Link>
                ) : (
                  <Link to={APP_ROUTES.SIGN_IN}>Connexion</Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
