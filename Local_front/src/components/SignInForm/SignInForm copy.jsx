import React, { useState } from "react";
import { useSelector } from "react-redux"; // Si vous utilisez Redux, sinon, retirez cette importation
import Input from "../Input/Input";
import Button from "../Button/Button";

const SignInForm = () => {
  // Utilisation de useState pour gérer l'état local de la sélection du rôle
  const [role, setRole] = useState("tenant");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission du formulaire
  };

  const updateForm = (value, inputName) => {
    // Implémentez la logique pour mettre à jour l'état du formulaire ici
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <Input
          label="Email"
          value={""} // Fournissez des valeurs initiales ici
          onChange={(value) => updateForm(value, "email")}
        />
        <Input
          label="Mot de passe"
          type="password"
          value={""} // Fournissez des valeurs initiales ici
          onChange={(value) => updateForm(value, "password")}
        />
        {/* Sélection du rôle */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="tenant">Tenant</option>
          <option value="owner">Owner</option>
        </select>
        <div className="btns">
          <Button
            type={"submit"}
            text={"Valider"}
            color={"var(--green-light)"}
          />
        </div>
      </form>
    </>
  );
};

export default SignInForm;
