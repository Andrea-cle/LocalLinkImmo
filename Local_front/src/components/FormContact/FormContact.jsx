// Importer useState pour gérer les états locaux dans un composant fonctionnel
import { useState } from "react";
import Button from "../Button/Button";
import "./formContact.scss";
import Input from "../Input/Input";

const FormContact = () => {
  // Définir des états locaux pour gérer les champs du formulaire
  const [email, setEmail] = useState("");
  const [requestType, setRequestType] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut de soumission du formulaire

    // VERIFIER que tous les champs sont remplis et que les données sont exploitables
    if (!email || !requestType || !message) {
      setError("Veuillez remplir tous les champs du formulaire");
      return;
    }
    setError("");
    // SI un seul des champs est vide ou mal rempli affiché le ou les messages d'erreur blocage de l'envoi au back

    // SI tout est bon envoie des données au back pour réaliser l'INSERT INTO dans la table contact
    // try{
    //   const resonse = await fetch
    // }

    // Réinitialiser les états après la soumission du formulaire
    setEmail("");
    setRequestType("");
    setMessage("");
  };

  return (
    <div className="form-contact">
      <h2>Formulaire de Contact</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email :
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Demande concernant :
          <select
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
            required
          >
            <option value="">Sélectionnez...</option>
            <option value="Bail">Demande relative à un bail</option>
            <option value="Locataire">Demande relative à un locataire</option>
            {/* <option value="Document">Demande relative à un document</option> */}
            <option value="Autre">Autre demande</option>
          </select>
        </label>
        {/* Champ de texte pour le message avec cadre et placeholder */}
        <label>
          Message :
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez votre message ici (200 caractéres maximum)"
            maxLength={200}
            required
          />
        </label>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default FormContact;
