// Importer le module de gestion des doc depuis la base de données
import { DocDB } from "../databases/doc.db.js"; 
// Permet le traitement des fichiers
import formidable from "formidable"; 

// Fonction pour créer les documents
const create = async (req, res) => {

  // Extrait les paramètres de la requête
  const { type, homeId, tenantId } = req.params;

  // Permet de construie le chemin d'enregistremennt du document
  const url = `./src/documents/${type}/${homeId}/${tenantId}`;

  const form = formidable({
    uploadDir: url,
    keepExtensions: true,
    createDirsFromUploads: true,
    // Filtrer les types de fichiers 
    filter: (opts) => {
      const { mimetype } = opts;
      if (mimetype !== "application/pdf") return false;
      return true;
    },
  });

  let files = null;
  try {
    [, files] = await form.parse(req);
  } catch (err) {
    console.log("err =>", err.message);
  }
  console.log(files)
  // Vérifie si un fichier est téléchargé
  if (!files.doc)
    return res.status(415).json({ message: `Unsupported Media Type` });

    // Créer un document dans la base de donnée
  const docResult = await DocDB.createDoc(url, userId, tenantId, homeId);
  const response = docResult.response;

  return res
    .status(response ? 415 : 201)
    .json({ message: `Request processed successfully and document created.` });
};

// Permet de lire tous les docs
const readAllDoc = async (req, res) => {
  const userId = req.body.userID;
  const response = await DocDB.readAllDoc(userId);

  const { result, error } = response;

  return res.status(error ? 500 : 200).json({
    message: error ? error : `Request on all documents successful`,
    result,
  });
};


const deleteOne = async ({ params: { doc_id } }, res) => {
  const response = await DocDB.deleteOne(doc_id);

  const error = response.error;

  return res.status(error ? 500 : 200).json({
    message: error ? error : ` Document with id ${doc_id} deleted successfully`,
  });
};

export const DocController = {
  create,
  readAllDoc,
  deleteOne,
};
