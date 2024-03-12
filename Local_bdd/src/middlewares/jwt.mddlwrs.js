// Importation de la fonction jwtVerify depuis le fichier jwt.utils.js qui permet de vérifier la validité d'un jeton JWT
import { jwtVerify } from "../utils/jwt.utils.js";

// Middleware pour vérifier la validité du jeton JWT
const jwtMddlwr = (req, res, next) => {
  // Récupération du jeton JWT depuis l'en-tête Authorization de la requête
  const token = req.headers.authorization;

  // Vérification de la validité du jeton en utilisant la fonction jwtVerify
  const userID = jwtVerify(token);

  // Si le jeton est invalide ou non présent, renvoie une réponse avec un statut 401 et un message d'erreur
  if (!userID) return res.status(401).json({ message: `Invalid Token ! ` });

  // Ajout de l'identifiant de l'utilisateur extrait du jeton à l'objet req.body pour une utilisation ultérieure
  req.body.userID = userID;

  // Appel de la fonction next() pour passer au middleware suivant dans la chaîne de middleware
  next();
};

// Exportation du middleware jwtMddlwr pour une utilisation dans d'autres parties de l'application
export default jwtMddlwr;
