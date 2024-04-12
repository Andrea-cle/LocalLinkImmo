import express from "express";
import { ContactController } from "../controllers/contact.controller.js";

const initContactRoutes = (app) => {
  const contactRouter = express.Router();

  // GET
  contactRouter.get("/read", ContactController.insertedContact);

  // POST
  contactRouter.post("/", ContactController, insertedContact);

  //   PUT
  contactRouter.put("/update", ContactController, updateMessageStatut);

  //   DELETE
  contactRouter.delete("/delete", ContactController, deleteMessage);

  //   lié le router à /contact
  app.use("/contact", contactRouter);
};

export default initContactRoutes;
