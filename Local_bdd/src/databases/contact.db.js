import query from "./init.db";

// INSERT DELETE UPDATE READ

// requete pour insérer un contact
const createContact = async (email, subject, comment) => {
  const sql = `
    INSERT INTO contact (email, subject, comment) 
    VALUES (?, ?, ?)
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [subject, email, comment]);
  } catch (err) {
    error = err.message;
  } finally {
    return { error, result };
  }
};

// requete pour sélectionner tous les messages non lus
const unreadMessage = async (comment, statut) => {
  const sql = `
    SELECT * FROM contact
     WHERE statut = 0
     `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [comment, statut]);
  } catch (err) {
    error = err.message;
  } finally {
    return { error, result };
  }
};

// requete pour selectionner tous les messages lus soit à 1
const readMessage = async (comment, statut) => {
  const sql = `
    SELECT * FROM contact
    WHERE statut = 1
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [comment, statut]);
  } catch (err) {
    error = err.message;
  } finally {
    return { error, result };
  }
};

// requete pour selectionner 1 message en fonction de son id

const idMessage = async (comment, id) => {
  const sql = `
    SELECT * FROM contact
    WHERE id=?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [comment, id]);
  } catch (err) {
    error = err.message;
  } finally {
    return { error, result };
  }
};

// requete pour modifier le statut d'un message passer de 0 à 1
const updateStatut = async (newStatut, id) => {
  const sql = `
UPDATE contact 
SET statut = 1
WHERE id = ?
`;

  let result = null;
  let error = null;

  try {
    result = await query(sql, [newStatut, id]);
  } catch (err) {
    error = err.message;
  } finally {
    return { error, result };
  }
};

// requete pour supprimer 1 message
const deleteMessage = async (id) => {
  const sql = `
    DELETE FROM contact
     WHERE id = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id]);
  } catch (err) {
    error = err.message;
  } finally {
    return { result, error };
  }
};

export const ContactDB = {
  createContact,
  unreadMessage,
  readMessage,
  idMessage,
  updateStatut,
  deleteMessage,
};
