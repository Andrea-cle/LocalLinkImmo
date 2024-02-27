import { APP_ROUTES } from "../../constants/route.const";
import React from 'react';
import "./home.scss";

const Home = () => {
  return (
    <section className="home">
      <div className="home_navigate">
        
        <nav>
        <ul>

         <li><a href="#">
         <i className="fa-solid fa-house" />
          Accueil
          </a>
          </li>
         <li> <a href="#">
         <i className="fa-solid fa-right-to-bracket" />
          Utilisateur
          </a>
          </li>
         <li> <a href="#">
         <i className="fa-solid fa-keyboard" />
          Contacts</a></li>
          </ul>
        </nav>
        <h3>Bienvenue sur notre site !</h3>
        <p>Autogérer vous même vos propres biens immobiliers pour une meilleure visibilité</p>
      </div>
    </section>
  );
};

export default Home;
