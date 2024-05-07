// Création de compte

import React, { useState } from "react";
import "./signUp.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { postRequest } from "../../api/api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [role, setRole] = useState("1");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    const newErrors = {};

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email) || email.length > 150) {
      isValid = false;
      newErrors.email = "Veuillez fournir un email valide";
    }

    // Vérifier si le password fait bien minimum 8 caractères
    if (password.length < 8) {
      isValid = false;
      newErrors.password =
        "Veuillez saisir un mot de passe de 8 caractères minimum ";
    }

    if (password !== confirmPass) {
      isValid = false;
      newErrors.password = "Le mot de passe et la confirmation sont différents";
    }

    if (role !== "1" && role !== "2" && role !== "") {
      // Si le role est vide ou différent de 1 ou 2
      isValid = false;
      newErrors.role = "Veuillez sélectionner un rôle";
    }

    setErrors(newErrors);
    setSuccessMessage(null);
    return isValid;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const create = { email, password, role };

    try {
      const response = await postRequest("/user/create", create);

      // Redirection vers la page de confirmation après la création du compte
      navigate("/confirmationPage");

      if (response.status == 200) {
        setErrors({});
        setSuccessMessage("Bienvenue ! Vous pouvez désormais vous connecter");

        // Réinitialisation des champs du formulaire
        setEmail("");
        setPassword("");
        setConfirmPass("");
        setRole("");
      } else {
        setErrors({});
        setErrors({
          globalError:
            "Une erreur est survenue, veuillez recréer un compte ultérieurement",
        });
        setSuccessMessage(null);
      }
    } catch (error) {
      setErrors({});
      setErrors({
        globalError: "Erreur lors de la communication avec le serveur",
      });
      setSuccessMessage(null);
    }
  };

  return (
    <section>
      <h2>Créez-vous un compte pour accéder à toutes les fonctionnalités !</h2>

      {errors.globalError && <p className="error_red">{errors.globalError}</p>}
      {successMessage && <p className="successMessage">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="sign-up-form">
        {/* Champ de saisie pour l'email */}
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(value) => setEmail(value)}
        />

        {errors.email && <p className="error_red">{errors.email}</p>}

        {/* Champ de saisie pour le mot de passe */}
        <Input
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(value) => setPassword(value)}
        />

        {errors.password && <p className="error_red">{errors.password}</p>}

        {/* Champ de saisie pour la confirmation du mot de passe */}
        <Input
          label="Confirmation du mot de passe"
          type="password"
          value={confirmPass}
          onChange={(value) => setConfirmPass(value)}
        />

        {errors.confirmPass && (
          <p className="error_red">{errors.confirmPass}</p>
        )}

        {/* Sélecteur de rôle utilisateur */}
        <select
          id="role"
          // label="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Sélectionnez...</option>
          <option value="1">Locataire</option>
          <option value="2">Propriétaire</option>
        </select>
        {/* Bouton de soumission du formulaire */}

        {errors.role && <p className="error_red">{errors.role}</p>}

        <div className="btns">
          <Button
            type={"submit"}
            text={"Bienvenue !"}
            color={"var(--primary)"}
          />
        </div>

        {/* Lien vers la page de connexion pour les utilisateurs déjà inscrits */}
        <p>
          Vous avez déjà un compte ? <a href="/login">Connectez-vous</a>
        </p>
      </form>
    </section>
  );
};
export default SignUp;
