import React, { useState } from "react";
import Input from "../Input/Input";
import "./signUp.scss";

const SignUp = () => {
  // State pour stocker les valeurs des champs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [role, setRole] = useState("");

  // Fonction pour gérer le changement de ,l'email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Fonction pour gérer le changement de mot de passe
  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };

  // Fonction pour gérer la confirmation du mot de passe
  const handleConfirmPassChange = (event) => {
    setConfirmPass(event.target.value);
  };

  // Fonction pour gérer le rôle
  const handleRole = (event) => {
    setRole(event.target.value);
  };

  // Fonction pour la soumission de formulaire
  const handleSubmit = (event) => {
    event.preventDefault();

    // Verification pour la correspondance des mdp
    if (password !== confirmPass) {
      message.err("Les mots de passes ne correspondent pas");
      return;
    }
  };
  return (
    <>
      <div>
        <h2> Formulaire de connexion</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Mot de Passe :</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePassChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPass"> Confirmer le mot de passe :</label>
            <input
              type="password"
              id="confirmPass"
              name="confirmPass"
              value={confirmPass}
              onChange={handleConfirmPassChange}
              required
            />
          </div>
          <div>
            <label htmlFor="role">Rôle :</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={handleRole}
              required
            >
              <option value="">Selectionnez un rôle :</option>
              <option value="Locataire">Locataire</option>
              <option value="Propriétaire">Propriétaire</option>
            </select>
          </div>
          <button type="submit">Welcome !</button>
        </form>
      </div>
    </>
  );
};
export default SignUp;
