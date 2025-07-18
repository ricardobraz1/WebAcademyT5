import express from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';
import router from './router/index';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import setLangCookie from './middlewares/setLangCookie';
import { checkDatabaseConnection } from './utils/checkDatabaseConnection';
import { session } from "../src/middlewares/session";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";
//import "./types/session"; 


// Carrega variáveis de ambiente
dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 2323;

// Middlewares
app.use(express.json()); 
app.use(cookieParser());
app.use(setLangCookie); 
app.use(session())

// Roteamento
app.use(router);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Inicia o servidor
const startServer = async () => {
  await checkDatabaseConnection();
  app.listen(PORT, () => {
    console.log(`[${process.env.API_NAME}] Server is running at http://localhost:${PORT}`);
  });
};

startServer();
