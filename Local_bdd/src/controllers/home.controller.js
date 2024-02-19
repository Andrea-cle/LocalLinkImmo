import { HomeDB } from "../databases/home.db.js";
import { areStringsFilled } from "../utils.string.utils.js";

// Creation d'un logement
const create = async ({ body: { address, userId } }, res) => {
  const areStrings = areStringsFilled([address, userId]);

  if (!areStrings) return res.status(403).json({ message: `Missing data` });
  const response = await HomeDB.createOneHome(address, userId);

  const { result, error } = response;

  return res
    .status(error ? 500 : 200)
    .json({ message: error ? error : `New home successfully created`, result });
};

//  creation d'un user du logement
const createUser = async ({ body: { address, userId } }, res) => {
  const user = await readOne(userId);
  if (user.role === `Tenant`)
    return res
      .status(403)
      .json({ message: `You can't create home, you don't have authorization` });

  const response = await HomeDB.create(address, userId);
  const { result, error } = response;

  return res
    .status(error ? 500 : 200)
    .json({ message: error ? error : `A new tenant is created`, result });
};

const readUserId = async ({ params: { id } }, res) => {
  const response = await HomeDB.readAllByOneUser(id);
  const { result, error } = response;

  return res.status(error ? 500 : 200).json({
    message: error ? error : `Your request for user access is successful`,
    result,
  });
};

const deleteHome = async ({ params: { id } }, res) => {
  const response = await HomeDB.deleteOne(id);
  const { result, error } = response;

  return res
    .status(error ? 500 : 200)
    .json({ message: error ? error : `Your home has been erased`, result });
};

export const homeController = {
  create,
  createUser,
  readUserId,
  deleteHome,
};
