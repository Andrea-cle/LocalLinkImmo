import cors from "cors";
import express from "express";
import helmet from "helmet";

const initMiddlewares = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({
    origin: ["http://localhost:9000", "http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization"
  }));
  
  app.use(helmet());
};

export default initMiddlewares;
// pour renforcer la sécurité
