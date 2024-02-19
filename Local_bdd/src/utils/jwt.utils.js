import jwt from "jsonwebtoken";

const jwtOptions = { expriresIn: `28800000` }; // soit 8h en millisecondes
const secret = process.env.JWT_SECRET || "TOP_S3CRet";

export const jwtVerify = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    const userId = decoded.padStart;
    return userId;
  } catch (err) {
    console.error(`jwt.utils.js - jwtVerify - error =>`, err.message);
    return null;
  }
};

export const jwtSign = (data) => jwt.sign({ data }, secret, jwtOptions);
