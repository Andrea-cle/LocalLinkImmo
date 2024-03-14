import query from "./init.db.js";

// Définition des opérations liées à la table Home

  // Création d'un nouveau logement
  const createOneHome = async(address, userId) => {
    const sql = `
    INSERT INTO home (address) 
    VALUES (?);
    `; 

    let result = null; // Résultat de la première requête
    let result2 = null; // Résultat de la deuxième requête
    let error = null; // Erreur potentielle

    try {
      result = await query(sql, [address]); // Exécution de la première requête pour ajouter l'adresse
      const homeId = result.insertId; // Récupération de l'ID du nouveau logement
      const sql2 = `INSERT INTO user_home (user_id, home_id) VALUES (?, ?);`; // Requête SQL pour lier l'utilisateur au logement
      result2 = await query(sql2, [userId, homeId]); // Exécution de la deuxième requête pour lier l'utilisateur au logement
    } catch (err) {
      error = err.message; // En cas d'erreur, enregistrement du message d'erreur
    } finally {
      return { error, result, result2 }; // Retourne les résultats et les erreurs
    }
  }

  // Lecture de tous les logements associés à un utilisateur
 const readAllByOneUser = async (userId) => {
    const sql = `
      SELECT home.id AS home_id, home.address, user.id AS user_id
      FROM user
      JOIN user_home ON user.id = user_home.user_id
      JOIN home ON home.id = user_home.home_id
      WHERE user.id = ?
    `; // Requête SQL pour récupérer tous les logements associés à un utilisateur

    let result = null; // Résultat de la requête
    let error = null; // Erreur potentielle
    try {
      result = await query(sql, [userId]); // Exécution de la requête
    } catch (err) {
      error = err.message; // En cas d'erreur, enregistrement du message d'erreur
    } finally {
      return { result, error }; // Retourne le résultat et l'erreur
    }
  }

  // Lecture de tous les utilisateurs associés à un logement
  const readAllByOneHome = async (homeId) => {
    const sql = `
      SELECT * FROM home
      JOIN user_home ON user_home.home_id = home.id
      WHERE home.id = ?
    `; // Requête SQL pour récupérer tous les utilisateurs associés à un logement

    let result = null; // Résultat de la requête
    let error = null; // Erreur potentielle
    try {
      result = await query(sql, [homeId]); // Exécution de la requête
    } catch (err) {
      error = err.message; // En cas d'erreur, enregistrement du message d'erreur
    } finally {
      return { result, error }; // Retourne le résultat et l'erreur
    }
  }

  // Suppression d'un logement
  const deleteOne = async (homeId) => {
    const sql = `DELETE FROM home WHERE id = ?;`; // Requête SQL pour supprimer un logement

    let result = null; // Résultat de la requête
    let error = null; // Erreur potentielle
    try {
      result = await query(sql, [homeId]); // Exécution de la requête pour supprimer le logement
      if (result.affectedRows !== 1) // Vérification du nombre de lignes affectées par la requête
        throw new Error(`An error has occurred, you cannot delete the home`); // En cas d'erreur, lancer une nouvelle erreur
    } catch (err) {
      error = err.message; // En cas d'erreur, enregistrement du message d'erreur
    } finally {
      return { error, result }; // Retourne le résultat et l'erreur
    }
  }


export const HomeDB = {
  createOneHome,
  readAllByOneHome,
  readAllByOneHome,
  deleteOne, 
}; // Exporte l'objet HomeDB contenant les opérations sur la table Home
