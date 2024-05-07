// Import des hooks useState et useEffect depuis React
import { useState, useEffect } from "react";
// Import du fichier de style adminDashboard.scss
import "./adminDashboard.scss";
// Import des fonctions getRequest, deleteRequest et putRequest depuis le fichier api.js
import { getRequest, deleteRequest, putRequest } from "../../api/api";
// Import du composant Button depuis Button.js
import Button from "../Button/Button";

// Composant DashboardAdmin
const DashboardAdmin = () => {
  // État pour stocker les messages récupérés depuis l'API
  const [messages, setMessages] = useState([]);
  // État pour stocker les erreurs éventuelles lors de la récupération des messages
  const [errors, setErrors] = useState(null);
  // État pour stocker l'ID du message à supprimer
  const [selectMessageDeleteId, setSelectMessageDeleteId] = useState(null);
  // État pour stocker l'ID du message à marquer comme lu
  const [selectMessageUpdateId, setSelectMessageUpdateId] = useState(null);

  // Effet exécuté lors du montage du composant pour récupérer les messages non lus
  useEffect(() => {
    fetchMessages();
  }, []);

  // Effet exécuté lorsque selectMessageUpdateId change pour mettre à jour les messages
  useEffect(() => {
    setMessages(
      messages.filter((message) => message.id !== selectMessageUpdateId)
    );
  }, [selectMessageUpdateId]);

  // Effet exécuté lorsque selectMessageDeleteId change pour mettre à jour les messages
  useEffect(() => {
    setMessages(
      messages.filter((message) => message.id !== selectMessageDeleteId)
    );
    // Appel à la fonction pour récupérer les messages non lus lors du montage du composant
  }, [selectMessageDeleteId]);

  // Fonction pour récupérer les messages non lus depuis l'API
  const fetchMessages = async () => {
    try {
      // Récupération du token depuis le localStorage
      const token = window.localStorage.getItem("token");
      // Requête GET pour obtenir les messages non lus
      const response = await getRequest("/contact/unread", token);

      if (response.status === 200) {
        // Mise à jour de l'état messages avec les messages récupérés depuis l'API
        setMessages(response.result.unreadMessage);
      } else {
        // En cas d'erreur, définition d'un message d'erreur
        setErrors(
          "Une erreur s'est produite lors de la récupération des messages."
        );
      }
    } catch (error) {
      // En cas d'erreur de communication avec le serveur, définition d'un message d'erreur
      setErrors("Erreur de communication avec le serveur.");
    }
  };

  // Fonction pour supprimer un message
  const handleDeleteMessage = async (messageId) => {
    try {
      // Récupération du token depuis le localStorage
      const token = window.localStorage.getItem("token");
      // Requête DELETE pour supprimer le message avec l'ID spécifié
      const response = await deleteRequest(
        `/contact/delete-message/${messageId}`,
        token
      );

      if (response.status === 200) {
        // Mise à jour de l'état selectMessageDeleteId avec l'ID du message supprimé
        setSelectMessageDeleteId(messageId);
      } else {
        // En cas d'erreur, définition d'un message d'erreur
        setErrors(
          "Une erreur s'est produite lors de la suppression du message."
        );
      }
    } catch (error) {
      // En cas d'erreur de communication avec le serveur, définition d'un message d'erreur
      setErrors("Erreur de communication avec le serveur.");
    }
  };

  // Fonction pour marquer un message comme lu
  const handleMarkAsRead = async (messageId) => {
    const body = {};
    try {
      // Récupération du token depuis le localStorage
      const token = window.localStorage.getItem("token");
      // Requête PUT pour marquer le message comme lu avec l'ID spécifié
      const response = await putRequest(
        `/contact/statut-message/${messageId}`,
        body,
        token
      );

      if (response.status === 200) {
        // Mise à jour de l'état selectMessageUpdateId avec l'ID du message mis à jour
        setSelectMessageUpdateId(messageId);
      } else {
        // En cas d'erreur, définition d'un message d'erreur
        setErrors(
          "Une erreur s'est produite lors de la mise à jour du message."
        );
      }
    } catch (error) {
      // En cas d'erreur de communication avec le serveur, définition d'un message d'erreur
      setErrors("Erreur de communication avec le serveur.");
    }
  };

  // Rendu du composant
  return (
    <div className="dashboard-admin">
      <h2>Tableau de bord administrateur</h2>
      {/* Affiche le message d'erreur s'il y a des erreurs */}
      {errors && <p className="error_red">{errors}</p>}{" "}
      {/* Affiche la liste des messages */}
      <div className="message-list">
        {messages.map((message) => (
          <div key={message.id} className={`message`}>
            <div className="informations">
              <p>Heure de réception : {message.receipt}</p>
              <p>Expéditeur : {message.email}</p>
            </div>

            <div className="comments">
              <p>{message.comment}</p>
              <strong>Messages non lus</strong>
            </div>

            <div className="btns">
              {/* Condition pour transformer le bouton "Lu" en "Supprimer" une fois le message lu*/}
              <Button
                type={"submit"}
                text={message.statut === "1" ? "Lu" : "Supprimer"}
                onClick={() => {
                  if (message.statut === "1") {
                    handleMarkAsRead(message.id);
                  } else {
                    handleDeleteMessage(message.id);
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DashboardAdmin;
