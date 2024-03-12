import query from "./init.db.js";

// Création du compte utilisateur
const create = async (role, email, password) => {
  const sql = `
    INSERT INTO user (role, email, password)
    VALUES (?, ?, ?)
  `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [role, email, password]);
  } catch (err) {
    error = err.message;
  } finally {
    return { error, result };
  }
};

// Ajout d'un locataire sur un logement existant
const addTenant = async (userId, homeId) => {
  const sql = `
    INSERT INTO user_home (home_id, user_id)
    VALUES (?, ?)
  `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [homeId, userId]);
  } catch (err) {
    error = err.message;
  } finally {
    return { error, result };
  }
};

// Lecture des informations d'un utilisateur
const readOne = async (userID) => {
  const sql = `
    SELECT id, role, email
    FROM user
    WHERE id = ?
  `;

  let result = null;
  let error = null;
  try {
    result = await query(sql, [userID]);
  } catch (err) {
    error = err.message;
  } finally {
    return { result, error };
  }
};

// Lecture des informations d'un utilisateur par email
const readByEmail = async (email) => {
  const sql = `
    SELECT id, email, password
    FROM user
    WHERE email = ?
  `;

  let error = null;
  let result = null;
  try {
    result = await query(sql, [email]);
  } catch (err) {
    error = err.message;
  } finally {
    return { result, error };
  }
};

// Mise à jour du mot de passe d'un utilisateur
const updatePassword = async (newPassword, id) => {
  const sql = `
    UPDATE user 
    SET password = ?
    WHERE id = ?
  `;

  let result = null;
  let error = null;
  try {
    result = await query(sql, [newPassword, id]);
    if (result.changeRows !== 1)
      throw new Error(`Une erreur s'est produite, vous ne pouvez pas changer le mot de passe`);
  } finally {
    return { result, error };
  }
};

// Mise à jour de l'adresse e-mail d'un utilisateur
const updateEmail = async (newEmail, id) => {
  const sql = `
    UPDATE user
    SET email = ? 
    WHERE id = ?
  `;

  let result = null;
  let error = null;
  try {
    result = await query(sql, [newEmail, id]);
    if (result.changeRows !== 1)
      throw new Error(`Une erreur s'est produite, vous ne pouvez pas modifier l'e-mail`);
  } catch (err) {
    error = err.message;
  } finally {
    return { result, error };
  }
};

// Suppression du compte utilisateur
const deleteOne = async (id) => {
  const sql = `
    DELETE FROM user
    WHERE id = ?
  `;

  let result = null;
  let error = null;
  try {
    result = await query(sql, [id]);
    if (result.changeRows !== 1)
      throw new Error(`Une erreur s'est produite, vous ne pouvez pas supprimer le compte`);
  } catch (err) {
    error = err.message;
  } finally {
    return { result, error };
  }
};

export const UserDB = {
  create,
  addTenant,
  readOne,
  readByEmail,
  updatePassword,
  updateEmail,
  deleteOne,
};
