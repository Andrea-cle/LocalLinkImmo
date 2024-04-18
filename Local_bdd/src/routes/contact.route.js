import express from "express";
import { ContactController } from "../controllers/contact.controller.js";
import jwtMddlwr from "../middlewares/jwt.mddlwrs.js";

const initContactRoutes = (app) => {
  const contactRouter = express.Router();

  // GET
  contactRouter.get(
    "/unread",
    jwtMddlwr,
    ContactController.selectUnreadMessage
  );
  contactRouter.get(
    "/read-messages",
    jwtMddlwr,
    ContactController.selectReadMessage
  );
  contactRouter.get(
    "/message/:id",
    jwtMddlwr,
    ContactController.selectIdMessage
  );

  // POST
  contactRouter.post("/write", ContactController.insertedContact);

  //   PUT
  contactRouter.put(
    "/statut-message/:id",
    jwtMddlwr,
    ContactController.updateMessageStatut
  );

  //   DELETE
  contactRouter.delete(
    "/delete-message/:id",
    jwtMddlwr,
    ContactController.removeMessage
  );

  //   lié le router à /contact
  app.use("/contact", contactRouter);
};

export default initContactRoutes;
