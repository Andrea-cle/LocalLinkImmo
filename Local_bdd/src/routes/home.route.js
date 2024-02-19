import express from "express";
import { HomeController } from "../controller/home.controller.js";
import { jwtMddlwr } from "../middlewares/jwt.mddlwrs.js";

const initHomeRoutes = (app) => {
  const homeRouter = express.Router();

  // GET
  homeRouter.get("/:id", HomeController, readUserId);

  //  POST
  homeRouter.post("/", jwtMddlwr, create);
  homeRouter.post("/homeID", jwtMddlwr, createUser);

  // DELETE
  homeRouter.delete("/:homeID", deleteHome);

  // lié le router au chemin /home
  app.use("/home", homeRouter);
};

export default initHomeRoutes;
