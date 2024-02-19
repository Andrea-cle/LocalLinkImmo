import { DocDB } from "../databases/doc.db.js";
import formidable from "formidable";

const create = async (req, res) => {
  const { type, homeId, tenantId } = req.params;

  const url = `./src/documents/${type}/${homeId}/${tenantId}`;

  const form = formidable({
    uploadDir: url,
    keepExtensions: true,
    createDirsFromUploads: true,
    filter: (opts) => {
      const { name, mimetype, originalFilename } = opts;
      if (mimetype !== "application/pdf") return false;
      return true;

      // utiliser name et filename
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

  const docResult = await DocDB.createDoc(url, userId, tenantId, homeId);
  const response = docResult.response;

  return res
    .status(response ? 415 : 201)
    .json({ message: `Request processed successfully and document created.` });
};

const readAllDoc = async ({params : { documents }}, res) => {
  const response = await DocDB.readAllDoc(documents);

  const { result, error } = response;

  return res.status(error ? 500 : 200).json({
    message: error ? error : `Request on all documents succesful`,
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

export const DocConstroller = {
  create,
  readAllDoc,
  deleteOne,
};
