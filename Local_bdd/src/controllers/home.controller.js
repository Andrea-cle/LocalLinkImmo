import { HomeDB } from "../databases/home.db.js";
import { areStringsFilled } from "../utils/string.utils.js";
import { UserDB } from "../databases/user.db.js";

//  creation d'un logement
const createHome = async ({ body: { address, userID } }, res) => {
  const user = await UserDB.readOne(userID);

  const areStrings = areStringsFilled([address]);

  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  if (user.role === `Tenant`)
    return res
      .status(403)
      .json({ message: `You can't create home, you don't have authorization` });

  const response = await HomeDB.createOneHome(address, userID);
  const { result, error } = response;
  return res
    .status(error ? 500 : 200)
    .json({ message: error ? error : `A new home is created`, result });
};

// Lecture par Id utilisateur
const readUserId = async ({ params: { id } }, res) => {
  const response = await HomeDB.readAllByOneUser(id);
  const { result, error } = response;

  return res.status(error ? 500 : 200).json({
    message: error ? error : `Your request for user access is successful`,
    result,
  });
};

// Lecture par ID logement
const readHomeUser = async ({ params: { homeId } }, res) => {
  const response = await HomeDB.readAllByOneHome(homeId);
  const { result, error } = response;

  return res.status(error ? 500 : 200).json({
    message: error ? error : `Your request for home acces is successful`,
    result,
  });
};

// Suppression d'un logement
const deleteHome = async ({ params: { homeId } }, res) => {
  const { result, error } = await HomeDB.deleteOne(homeId);

  try {
    if (error || result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `The home with id ${homeId} was not found` });
    }
    return res
      .status(200)
      .json({ message: `Your home has been erased`, result });
  } catch (err) {
    return res.status(500).json({ message: `Your home hasn't been erased` });
  } finally {
    return { error, result };
  }
};

export const HomeController = {
  createHome,
  readUserId,
  readHomeUser,
  deleteHome,
};
