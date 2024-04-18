import React, { useState } from "react";
import "./formContact.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { postRequest } from "../../api/api";
import { useNavigate } from "react-router-dom";
// import { link, useNavigate } from "react-router-dom";

const FormContact = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const validateForm = () => {
    let isValid = true; // Je créé une variable contenant un boolean à true par défaut, cette variable me permettra de savoir si le formulaire est bien rempli ou non
    // Si true = Bien rempli
    // Si false = Mal rempli ( au moins 1 erreur détectée dans l'un des champs )

    const newErrors = {};

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      // QQCH @ QQCH . QQCH
      isValid = false;
      newErrors.email = "Veuillez fournir un email valide";
    }

    if (subject === "") {
      isValid = false;
      newErrors.subject = "Veuillez sélectionner un sujet";
    }
    // trim() --> retire les espaces inutiles
    // "Jean " --> "Jean"
    // " Jean" --> "Jean"
    // " Jean " --> "Jean"
    // " Jean Paul " --> "Jean Paul"
    // "         " --> ""

    if (comment.trim().length < 20) {
      isValid = false;
      newErrors.comment =
        "Le commentaire doit contenir au minimum 20 caractères";
    }

    setErrors(newErrors);
    return isValid;
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // validateForm() == false
      return;
    }

    const contactData = { email, subject, comment }; // Automatique dans la bdd --> id en AI, date de réception du message et statut ( 0 )
    console.log(JSON.stringify(contactData));

    try {
      const response = await postRequest("/contact/write", contactData);
      console.log("Réponse du serveur :", response);

      if (response.status == 200) {
        setSuccessMessage(
          "Nous avons bien reçu votre message. Nous vous répondrons dans les plus brefs délais !"
        );
        setFormError(null);
        // console.log(
        //   "Nous avons bien reçu votre message. Nous vous répondrons dans les plus brefs délais !"
        // );
      } else {
        setFormError(
          "Une erreur est survenue, veuillez reformuler votre demande ultérieurement !"
        );
        setSuccessMessage(null);
        // console.log(
        //   "Une erreur est survenue, veuillez reformuler votre demande ultérieurement !"
        // );
      }
    } catch (error) {
      setFormError("Erreur lors de la communication avec le serveur");
      setSuccessMessage(null);
      // console.log("Erreur lors de la communication avec le serveur");
    }
  };

  return (
    <section>
      <h2>En quoi pouvons-nous vous aider ?</h2>

      <form onSubmit={handleSubmit} className="form-contact">
        <input
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // required
        />

        {errors.email && <p className="error_red">{errors.email}</p>}

        <select
          id="Subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          // required
        >
          <option value="">Sélectionnez...</option>
          <option value="Bail">Demande relative à un bail</option>
          <option value="Locataire">Demande relative à un locataire</option>
          {/* <option value="Document">Demande relative à un document</option> */}
          <option value="Autre">Autre demande</option>
        </select>

        {errors.subject && <p className="error_red">{errors.subject}</p>}

        <label>
          Message :
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            // required
          ></textarea>
        </label>

        {errors.comment && <p className="error_red">{errors.comment}</p>}

        <Button
          type={"submit"}
          text={"Dites-nous !"}
          color={"var(--primary)"}
        />

        {formError && <p className="error-message">{formError}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </section>
  );
};

export default FormContact;
