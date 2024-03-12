import express from "express";
import { DocController } from "../controllers/doc.controller.js";
import jwtMddlwr from "../middlewares/jwt.mddlwrs.js";

const initDocRoutes = (app) => {
  const docRouter = express.Router();

  //GET
  docRouter.get("/all", jwtMddlwr, DocController.readAllDoc);

  // POST
  docRouter.post("/insert", jwtMddlwr, DocController.create);
  docRouter.post("/insert/:type/:homeId/:tenantId", jwtMddlwr, DocController.create);

  // DELETE
  docRouter.delete("/:id", DocController.deleteOne);

  // Attaching router to /doc path
  app.use("/doc", docRouter);
};

export default initDocRoutes;
