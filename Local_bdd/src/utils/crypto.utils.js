import bcrypt from "bcrypt";

// Outils permettant de vérifier le mot de passe avec un salage contre les attaques
const saltRounds = 10;

// Permet de haché le mot de passe
export const hashPass = async (pass) => {
  let hashed = null;
  let error = null;
  try {
    hashed = await bcrypt.hash(pass, saltRounds);
  } catch (err) {
    error = err.message;
  } finally {
    return { hashed, error };
  }
};
// Permet de vérifier et de comparer avec l'ancde mot passe 
export const compareHash = async (passNotHashed, passHashed) => {
  let isSame = false;
  try {
    isSame = await bcrypt.compare(passNotHashed, passHashed);
  } catch (err) {
    console.error(err.message);
  } finally {
    return isSame;
  }
};
