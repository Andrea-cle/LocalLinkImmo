import query from "./init.db.js";

// Création du compte
const create = async (email, password, role) => {
  const sql = `
    INSERT INTO user (email, password, id_role)
    VALUES(?, ?, ?)
    `;

  // console.log("INSERT INTO : " + role);
  // console.log("INSERT INTO : " + email);
  // console.log("INSERT INTO : " + password);

  let error = null;
  let result = null;

  try {
    result = await query(sql, [email, password, role]);
  } catch (err) {
    error = err.message;
  } finally {
    return { error, result };
  }
};

// rajouter un locataire sur un logement existant
const addTenant = async (homeId, tenantId) => {
  const sql = `
  INSERT INTO user_home (home_id, user_id)
  VALUES (?, ?)
  `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [homeId, tenantId]);
  } catch (err) {
    error = err.message;
  } finally {
    return { error, result };
  }
};

// Lecture du compte (a vérifier si je garde)
const readOne = async (id) => {
  const sql = `
  SELECT id, role, email, password
  FROM user
  WHERE id =?
    `;

  let result = null;
  let error = null;
  try {
    result = await query(sql, [id]);
  } catch (err) {
    error = err.message;
  } finally {
    return { result, error };
  }
};

// Nouvel accés au compte avec email
const readByEmail = async (email) => {
  const sql = `
    SELECT id, email, password, id_role
    FROM user
    WHERE email = ?`;

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

// MAJ du mot de passe
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
      throw new Error(`An error has occurred, you cannot change the password`);
  } finally {
    return { result, error };
  }
};

// MAJ de l'adresse mail
const updateEmail = async (newEmail, id) => {
  const sql = `
  UPDATE user
  SET email= ? 
  WHERE id= ?`;

  let result = null;
  let error = null;
  try {
    result = await query(sql, [newEmail, id]);
    if (result.changeRows !== 1)
      throw new Error(`An error has occurred, you cannot modify the email`);
  } catch (err) {
    error = err.message;
  } finally {
    return { result, error };
  }
};

// Suppression du compte
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
      throw new error(`An error has occurred, you cannot delete the account`);
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
