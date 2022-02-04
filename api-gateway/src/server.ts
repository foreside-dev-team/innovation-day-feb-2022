import express, { Application, Request, Response } from "express";
import router from "./routes";
import "./handlers/test-server";

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

try {
  app.listen(port, (): void => {
    console.log(`API Gateway running on port ${port}`);
  });
} catch (error) {}
