import query from "./init.db.js";

// Creation d'un logement
const createOneHome = async (userId, address) => {
  const sql = `INSERT INTO home (address)
    VALUES(?);`;

  let result2 = null;
  let error = null;

  try {
    const result = await query(sql, [address]);
    const homeId = result.insertedId;
    const sql2 = `INSERT NTO user_home(user_id, home_id)
    VALUES(?,?)`;

    result2 = await query(sql2, [userId, homeId]);
  } catch (err) {
    error = e.message;
  } finally {
    return { error, result, result2 };
  }
};

// Lecture des logements d'un user c'est pour le proprio
const readAllByOneUser = async (id) => {
  const sql = `
    SELECT home.id AS home_id, home.address, user.id AS user_id
    FROM user
    JOIN user_home
    ON user.id = user_home.user_id
    JOIN home
    ON home.id=user_home.home_id
    WHERE user.id = ?
    `;

  let result = null;
  let error = null;
  try {
    result = await query(sql, [id]);
  } catch (err) {
    error = err.message;
  } finally {
    return { error, result };
  }
};

// Lecture des infos d'un logement
const readAllByOneHome = async (id) => {
  const sql = `
    SELECT * FROM home
    JOIN user_home ON user_home.home_id =home.home_id
    WHERE user_id=?
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

// Effacer un logement
const deleteOne = async (id) => {
  const sql = `
    DELETE FROM home
    WHERE id=?
    `;

  let result = null;
  let error = null;
  try {
    result = await query(sql, [id]);
    if (result.changeRows !== 1)
      throw new Error(`An error has occurred, you cannot delete the home`);
  } catch (err) {
    error = err.message;
  } finally {
    return { error, result };
  }
};

export const HomeDB = {
  createOneHome,
  readAllByOneUser,
  readAllByOneHome,
  deleteOne,
};
