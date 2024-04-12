import React from "react";
import "./homePage.scss";
import Slider from "../Slider/Slider";

const HomePage = () => {
  const images = [
    "../../public/images/desk.jpg",
    "../../public/images/home.png",
    "../../public/images/house.jpg",
    "../../public/images/warehouse.jpg",
    "../../public/images/bookkeeping.jpg",
    "../../public/images/estate.jpg",
  ];
  return (
    <main className="home-page">
      <Slider images={images} />

      <section className="article">
        <h3>Bienvenue !</h3>
        <article>
          <p>
            Notre site offre une expérience inégalée, mettant le pouvoir entre
            les mains des propriétaires tout en simplifiant chaque aspect de la
            gestion quotidienne des biens immobiliers.
          </p>
          <p>
            Que vous soyez propriétaire ou locataire, notre plateforme intuitive
            vous permet de gérer efficacement tous les aspects de vos biens
            immobiliers. Fini les tracas administratifs et les pertes de temps !
          </p>
          <p>
            Grâce à notre interface conviviale, vous pouvez effectuer toutes vos
            tâches en quelques clics, où que vous soyez et à tout moment. Pour
            les propriétaires, notre site offre une suite complète d'outils de
            gestion, y compris la gestion des loyers, la communication avec les
            locataires, le suivi des dépenses et des revenus, ainsi que des
            rapports détaillés pour une transparence totale. Pour les
            locataires, l'accès à un tableau de bord personnalisé facilite la
            communication avec les propriétaires, la gestion des paiements et la
            résolution des problèmes, offrant ainsi une expérience de location
            fluide et sans stress.<br></br>
            Découvrez dès aujourd'hui notre plateforme et prenez le contrôle de
            vos biens immobiliers comme jamais auparavant !
          </p>
        </article>
      </section>
    </main>
  );
};

export default HomePage;
