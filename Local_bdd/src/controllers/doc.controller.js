import { DocDB } from "../databases/doc.db.js"; // importe le module de gestion des doc depuis la base de données
import formidable from "formidable"; // Permet le traitement des fichiers

//Fonction pour créer les documents
const createDoc = async (req, res) => {
  // Extrait les paramètres de la requête
  const { type, homeId, tenantId } = req.params;

  //Permet de construire le chemin d'enregistrement des document
  const url = `./src/documents/${type}/${homeId}/${tenantId}`;

  const form = formidable({
    uploadDir: url,
    keepExtensions: true,
    createDirsFromUploads: true,
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
  if (!files.doc)
    return res.status(415).json({ message: `Unsupported Media Type` });

  const docResult = await DocDB.createDoc(url, type, tenantId, homeId);
  const response = docResult.response;

  return res
    .status(response ? 415 : 201)
    .json({ message: `Request processed successfully and document created.` });
};

const readAllDoc = async ({ params: { documents } }, res) => {
  const response = await DocDB.readAllDoc(documents);

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
  createDoc,
  readAllDoc,
  deleteOne,
};
