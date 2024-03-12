import React from "react";
import { Link } from "react-router-dom";

const ConfirmationPage = () => {
  return (
    <div className="confirmation-page">
      <h2>Confirmation de création de compte</h2>
      <p>Votre compte a été créé avec succès !</p>
      <p>Vous pouvez maintenant vous connecter avec vos identifiants.</p>
      <Link to="/login">Se connecter</Link>
    </div>
  );
};

export default ConfirmationPage;
