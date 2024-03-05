import express from "express";
import { UserController } from "../controllers/user.controller.js";
import jwtMddlwr from "../middlewares/jwt.mddlwrs.js";

const initUserRoutes = (app) => {
  const userRouter = express.Router();

  // GET
  userRouter.get("/read", jwtMddlwr, UserController.readOne);

  // POST
  userRouter.post("/", UserController.createOneUser);
  userRouter.post("/user/add_tenant", UserController.addTenant); 
  userRouter.post("/sign-in", UserController.signIn);

  // PUT
  userRouter.put("/password", jwtMddlwr, UserController.updatePassword);

  // DELETE
  userRouter.delete("/:id", jwtMddlwr, UserController.deleteUserAndAllData); 

  // lié le router à /user
  app.use("/user", userRouter);
};

export default initUserRoutes;
