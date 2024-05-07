import React, { useState } from "react";
import "./formContact.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { postRequest } from "../../api/api";

const FormContact = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      newErrors.email = "Veuillez fournir un email valide";
    }

    if (subject === "") {
      isValid = false;
      newErrors.subject = "Veuillez sélectionner un sujet";
    }

    if (comment.trim().length < 20) {
      isValid = false;
      newErrors.comment =
        "Le commentaire doit contenir au minimum 20 caractères";
    }

    setErrors(newErrors);
    setSuccessMessage(null);
    return isValid;
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const contactData = { email, subject, comment };

    try {
      const response = await postRequest("/contact/write", contactData);

      if (response.status == 200) {
        setErrors({});
        setSuccessMessage({
          success:
            "Nous avons bien reçu votre message. Nous vous répondrons dans les plus brefs délais !",
        });

        // Réinitialisation des champs du formulaire
        setEmail("");
        setSubject("");
        setComment("");
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
      <h2>En quoi pouvons-nous vous aider ?</h2>

      <img
        src="../../public/images/orientation.jpg"
        alt="Photo d'une boussole"
      />

      {errors.globalError && <p className="error_red">{errors.globalError}</p>}
      {successMessage && (
        <p className="success-message">{successMessage.success}</p>
      )}

      <form onSubmit={handleSubmit} className="form-contact">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(value) => setEmail(value)}
          required
        />

        {errors.email && <p className="error_red">{errors.email}</p>}

        <select
          id="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        >
          <option value="">Sélectionnez...</option>
          <option value="Bail">Demande relative à un bail</option>
          <option value="Locataire">Demande relative à un locataire</option>
          {/* <option value="Document">Demande relative à un document</option> */}
          <option value="Autre">Autre demande</option>
        </select>

        {errors.subject && <p className="error_red">{errors.subject}</p>}

        <label>
          <textarea
            placeholder=" Ecrivez votre Message ici"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </label>

        {errors.comment && <p className="error_red">{errors.comment}</p>}

        <div className="btns">
          <Button
            type={"submit"}
            text={"Dites-nous !"}
            color={"var(--primary)"}
          />
        </div>
      </form>
    </section>
  );
};

export default FormContact;
