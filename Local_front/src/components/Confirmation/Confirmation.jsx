import React from "react";
import { Link } from "react-router-dom";
import "./confirmation.scss";

const ConfirmationPage = () => {
  return (
    <main className="confirmation-page">
      <section className="article">
        <h2>Nous sommes heureux de vous compter parmi nous !</h2>
        <div className="texte">
          <p>Votre compte a été créé avec succès !</p>
          <p>Vous pouvez maintenant vous connecter avec vos identifiants.</p>
        </div>
      </section>
      <Link to="/login">Se connecter</Link>
    </main>
  );
};

export default ConfirmationPage;
