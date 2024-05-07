import { ContactDB } from "../databases/contact.db.js";
import { areStringsFilled } from "../utils/string.utils.js";

// requete pour insérer un contact
const insertedContact = async ({ body: { email, subject, comment } }, res) => {
  const areStrings = areStringsFilled([email, subject, comment]);

  if (!areStrings)
    return res.status(400).json({ message: `Données manquantes` });

  const { error, result: addContact } = await ContactDB.createContact(
    email,
    subject,
    comment
  );

  // Vérification que tous les champs soient remplis
  /*if (!email || !subject || !comment) {
    return res
      .status(400)
      .json({ message: `Veuillez remplir tous les champs requis` });
  }

  //  Vérification du format de l'email
  if (!isEmail(email)) {
    return res
      .status(400)
      .json({ message: `Le format de l'email est invalide` });
  }
*/
  if (error) {
    return res
      .status(500)
      .json({ message: `Erreur lors de l'insertion du contact` });
  }
  res.status(200).json({ message: `Contact créé avec succès`, addContact });
};

// requete pour sélectionner tous les messages non lus
const selectUnreadMessage = async (req, res) => {
  const { error, result: unreadMessage } = await ContactDB.unreadMessage();

  // Vérifie s'il y a une erreur dans la réponse
  if (error)
    return res.status(500).json({
      message: ` Erreur lors de la sélection des messages non lus : ${error}`,
    });
  res.status(200).json({
    message: `Sélection de tous les messages non lus réussie`,
    unreadMessage,
  });
};

//  requete pour selectionner tous les messages lus soit à 1
const selectReadMessage = async (req, res) => {
  const { error, result: readMessages } = await ContactDB.readMessage();

  if (error)
    return res.status(500).json({
      message: `Erreur lors de la sélection des messages lus : ${error}`,
    });
  res.status(200).json({
    message: `Sélection de tous les messages lus réussie`,
    readMessages,
  });
};

// requete pour selectionner 1 message en fontion de son id
const selectIdMessage = async (req, res) => {
  const messageId = req.params.id;

  const { error, result: readIdMessage } = await ContactDB.idMessage(messageId);

  if (error)
    return res.status(500).json({
      message: `Erreur lors de la sélection du message par son ID : ${error}`,
    });
  res.status(200).json({
    readIdMessage,
  });
};

// requete pour modifier le statut d'un message passer de 0 à 1

const updateMessageStatut = async (req, res) => {
  // recupére l'identifiant du message depuis les paramètres de la requête
  const messageId = req.params.id;

  const { error, result } = await ContactDB.updateStatut(messageId);

  if (error) {
    // En cas d'erreur lors de la mise à jour du statut, renvoyer une réponse avec le code d'erreur approprié
    return res.status(500).json({
      message: `Erreur lors de la mise à jours du statut du message : ${error}`,
      error,
    });
  }
  res.status(200).json({
    message: `Statut du message mis à jour avec succés `,
  });
};

// requete pour supprimer 1 message
const removeMessage = async (req, res) => {
  const messageId = req.params.id;

  const { error, result } = await ContactDB.deleteMessage(messageId);

  if (error) {
    return res.status(500).json({
      message: `Erreur lors de la suppression du message : ${error}`,
      error,
    });
  }

  res.status(200).json({
    message: `Le message à été supprimé avec succès`,
  });
};

export const ContactController = {
  insertedContact,
  selectUnreadMessage,
  selectReadMessage,
  selectIdMessage,
  updateMessageStatut,
  removeMessage,
};
