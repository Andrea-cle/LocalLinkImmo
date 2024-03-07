import query from "./init.db.js";

// Création d'un document
const createDoc = async (url, tenantId, homeId, type) => {
  const sql = `
    INSERT INTO documents (url, type)
    VALUES (?, ?)
    `;

  let result2 = null;
  let error = null;

  try {
     const result = await query(sql, [url, type]);
    const documentId = result.InsertedId;
    const sql2 = `INSERT INTO users_documents (doc_id, user_id, home_id)
    VALUES (?, ?, ?)`;

     result2 = await query(sql2, [documentId, tenantId, homeId]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result, result2 };
  }
};

// lecture des doc
const readAllDoc = async (userId) => {
  const sql = `
    SELECT * FROM documents
    JOIN users_documents
    ON documents.doc_id = users_documents.doc_id
    WHERE user_id = ?
  `;

  let result = null;
  let error = null;
  try {
    result = await query(sql, [userId]);
  } catch (err) {
    error = err.message;
  } finally {
    return { error, result };
  }
};


// MAJ des doc
// const updateDoc = async (document) => {
//   const sql = `
//     UPDATE documents
//     SET assurance =? 
//     WHERE id = ?
//     `;
//   let result = null;
//   let error = null;
//   try {
//     await query(sql, [document]);
//     result = await readAllDoc(document);
//   } catch (err) {
//     error = err.message;
//   } finally {
//     return { result, error };
//   }
// };

// effacer un document
const deleteOne = async (doc_id) => {
  const sql = `
    DELETE FROM documents
    WHERE id = ?
    `;
  let result = null;
  let error = null;
  try {
    result = await query(sql, [doc_id]);
    if (result.changeRows !== 1)
      throw new Error(`An error has occurred, you cannot delete the document`);
  } catch (err) {
    error = err.message;
  } finally {
    return { error, result };
  }
};

export const DocDB = {
  createDoc,
  readAllDoc,  
  deleteOne,
};
