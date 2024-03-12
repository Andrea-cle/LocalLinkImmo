import { UserDB } from "../databases/user.db.js";
import { DocDB } from "../databases/doc.db.js";
import { HomeDB } from "../databases/home.db.js";
import isEmail from "validator/lib/isEmail.js";
import { areStringsFilled } from "../utils/string.utils.js";
import { hashPass, compareHash } from "../utils/crypto.utils.js";
import { jwtSign } from "../utils/jwt.utils.js";


// Créer un nouvel utilisateur
const createOneUser = async (
  { body: { role, email, password, confirmPass } },
  res
) => {
  const areStrings = areStringsFilled([role, email, password, confirmPass]);
  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  if (role !== `owner` && role !== `tenant`)
    return res.status(403).json({ message: `Invalid Role` });

  if (!isEmail(email))
    return res.status(403).json({ message: `Invalid Email format` });

  if (password !== confirmPass)
    return res.status(400).json({ message: `your password doesn't match` });

  if (password.length < 8)
    return res.status(403).json({
      message: `Invalid Password format : must contain atleast 8 characters`,
    });

    // password hashing
  const hashPwResponse = await hashPass(password);
  const hashPwError = hashPwResponse.error;

  if (hashPwError) return res.status(500).json({ message: hashPwError });

  const response = await UserDB.create(role, email, hashPwResponse.hashed);
  const error = response.error;

  if (error)
    return res.status(502).json({ message: "You can't create an account" });

  return res
    .status(error ? 500 : 201)
    .json({ message: error ? error : `New user successfully created` });
};

// Ajoute un locataire à un logement
const addTenant = async ({ body: { userId, tenantId, homeId } }, res) => {
  const user = await readOneTenant(userId);
  const response = await UserDB.addTenant(tenantId, homeId);
  const error = response.error;

  if (user.role === `Tenant`)
    return res.status(403).json({ message: `you can't create accommodation` });

  return res
    .status(error ? 500 : 201)
    .json({ message: `User create successfully`, user: insertedId });
};

// Lit un utilisateur par ID
const readOne = async ({ body: { userID } }, res) => {
  const response = await UserDB.readOne(userID);
  const { result, error } = response;

  return res.status(error ? 500 : 200).json({
    message: error ? error : `Request on user ${userID} successful`,
    result,
  });
};

// Authentification de l'utilisateur
const signIn = async ({ body: { email, password } }, res) => {
  const { result, error } = await UserDB.readByEmail(email);

  if (error) return res.status(500).json({ message: error });
  if (result.length === 0)
    return res.status(401).json({ message: `Authentication failed` });

  const user = result[0];
  const userID = user.id;
  const pwBD = user.password;
  const userEmail = user.email;

  const arePwSame = await compareHash(password, pwBD);

  if (!arePwSame)
    return res
      .status(401)
      .json({ message: `Authentication failed, check mail and password.` });

  const token = jwtSign(userID);
  return res.status(200).json({
    message: `Authentication succeeded`,
    user: { userID, userEmail, token },
  });
};

// Met à jour le mot de passe
const updatePassword = async (
  { body: { oldPassword, newPassword, userID } },
  res
) => {
  const areStrings = areStringsFilled([oldPassword, newPassword]);

  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  if (newPassword.length < 8)
    return res.status(403).json({
      message: `Invalid Password format : must contain atlesat 8 characters`,
    });

  const userResponse = await UserDB.readOne(userID);
  const userOldPwDB = userResponse.result[0].password;

  const arePwSame = await compareHash(oldPassword, userOldPwDB);
  if (!arePwSame)
    return res
      .status(401)
      .json({ message: `Password doesn't match old password` });

  const hashPwResponse = await hashPass(newPassword);
  const hashPwError = hashPwResponse.error;

  if (hashPwError)
    return res.status(500).json({
      message: error
        ? error
        : `Update on password for user with id "${userID}" successfuly `,
    });
};

// Supprime l'utilisateur et toutes ses données
const deleteUserAndAllData = async (userId, res) => {
  const userHomes = await HomeDB.getUserHomes(userId);
  const userDoc = await DocDB.getUserDoc(userId);

  const userDeleteData = await UserDB.deleteOne(userId);

  if (userDeleteData.error) {
    return res.status(500).json({
      message: `Error deleting user: "${userDeleteData.error.message}"`,
    });
  }

  const homeDeleted = userHomes.map((home) => HomeDB.deleteOne(home.id));
  const homeDeleteResults = await Promise.all(homeDeleted);

  const docDeletePromises = userDoc.map((document) =>
    DocDB.deleteOne(document.id)
  );
  const docDeleteResults = await Promise.all(docDeletePromises);

  return res.status(200).json({
    message: "User and related data deleted successfully",
    userDeleteResult,
    homeDeleteResults,
    docDeleteResults,
  });
};

export const UserController = {
  createOneUser,
  readOne,
  signIn,
  addTenant,
  updatePassword,
  deleteUserAndAllData,
};
