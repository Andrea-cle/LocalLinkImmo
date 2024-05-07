// connexion

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./signinForm.scss";
import { APP_ROUTES } from "../../constants/route.const";
import { postRequest } from "../../api/api";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  // const [form, setForm] = useState({
  //   email: "",
  //   password: "");

  const validateForm = () => {
    let isValid = true;

    const newErrors = {};

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      newErrors.email = "Veuillez fournir un email valide";
    }

    // Vérifier si le password fait bien minimum 8 caractères
    if (password.length < 8) {
      isValid = false;
      newErrors.password =
        "Veuillez saisir un mot de passe de 8 caractères minimum ";
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

    const readData = { email, password };

    try {
      const response = await postRequest("/user/sign-in", readData);

      if (response.status == 200) {
        const infos = {
          id: response.result.user.userID,
          email: response.result.user.userEmail,
          role: response.result.user.userRole,
          token: response.result.user.token,
        };

        window.localStorage.setItem("infos", JSON.stringify(infos));
        // Transforme notre objet en une string grace à JSON.stringify

        const lesInfos = window.localStorage.getItem("infos");
        // J'obtiens une string et NON un objet même si le contenu en a l'apparence

        const lesInfosParse = JSON.parse(window.localStorage.getItem("infos"));
        // pour traduire la string en objet avec JSON.parse

        setErrors({});
        setSuccessMessage(`Bonjour ${email} !`);
        // redirection vers le dashboard

        // Enregistrer les données de l'utilisateur connecté dans le LS
        window.localStorage.setItem("Email", response.result.user.userEmail);
        window.localStorage.setItem("Role", response.result.user.userRole);
        window.localStorage.setItem("Id", response.result.user.userID);
        window.localStorage.setItem("token", response.result.user.token);
        navigate(APP_ROUTES.HOME_PAGE, { replace: true });

        // Réinitialiser les champs de formulaire
      } else {
        setErrors({});
        setErrors({
          globalError: "Identifiants incorrects. Veuillez réessayer.",
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
      <h2>C'est parti !</h2>

      {errors.globalError && <p className="error_red">{errors.globalError}</p>}
      {successMessage && <p className="successMessage">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="signIn-form">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(value) => setEmail(value)}
        />

        {errors.email && <p className="error_red">{errors.email}</p>}

        <Input
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(value) => setPassword(value)}
        />

        {errors.password && <p className="error_red">{errors.password}</p>}

        <div className="btns">
          <Button
            type={"submit"}
            text={"Go !"}
            color={"var{--primary)"}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </section>
  );
};
export default SignInForm;
