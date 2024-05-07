import express from "express";
import { HomeController } from "../controllers/home.controller.js";
import jwtMddlwr from "../middlewares/jwt.mddlwrs.js";

const initHomeRoutes = (app) => {
  const homeRouter = express.Router();

  // GET
  homeRouter.get("/:id", HomeController.readUserId);
  homeRouter.get("/home/:homeId", HomeController.readHomeUser);

  //  POST
  homeRouter.post("/", jwtMddlwr, HomeController.createHome);

  // DELETE
  homeRouter.delete("/:homeId", HomeController.deleteHome);

  // lié le router au chemin /home
  app.use("/home", homeRouter);
};

export default initHomeRoutes;
