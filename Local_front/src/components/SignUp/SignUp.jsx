import React, { useState } from "react";
import "./signUp.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../api/api";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPass: "",
    role: "tenant",
  });

  const navigate = useNavigate(); // Initialisation du hook useNavigate pour la redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envoi de la requête POST au serveur pour créer le compte utilisateur
    const response = await postRequest("/user", form);

    if (response.error) {
      console.error(response.error);
    } else {
      // Stockage des informations de l'utilisateur dans le localStorage
      localStorage.setItem("userEmail", form.email);
      localStorage.setItem("userRole", form.role);

      // Redirection vers la page de confirmation après la création du compte
      navigate("/confirmationPage");
    }
  };

  const updateForm = (value, inputName) => {
    setForm({
      ...form,
      [inputName]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="sign-up-form">
      {/* Champ de saisie pour l'email */}
      <Input
        label="Email"
        required={true}
        value={form.email}
        onChange={(value) => updateForm(value, "email")}
      />
      {/* Champ de saisie pour le mot de passe */}
      <Input
        label="Mot de passe"
        type="password"
        required={true}
        value={form.password}
        onChange={(value) => updateForm(value, "password")}
      />
      {/* Champ de saisie pour la confirmation du mot de passe */}
      <Input
        label="Confirmation du mot de passe"
        type="password"
        value={form.confirmPass}
        onChange={(value) => updateForm(value, "confirmPass")}
      />
      {/* Sélecteur de rôle utilisateur */}
      <select
        id="role"
        label="role"
        value={form.role}
        onChange={(event) => updateForm(event.target.value, "role")}
      >
        <option value="tenant">Locataire</option>
        <option value="owner">Propriétaire</option>
      </select>
      {/* Bouton de soumission du formulaire */}
      <div className="btns">
        <Button type={"submit"} text={"Valider"} color={"var(--primary)"} />
      </div>
      {/* Lien vers la page de connexion pour les utilisateurs déjà inscrits */}
      <p>
        Vous avez déjà un compte ? <a href="/login">Connectez-vous</a>
      </p>
    </form>
  );
};

export default SignUp;
