import express, { Express } from "express";
import { backendServer } from "./setupServer";
import databaseConnection from "./setupDatabase";

class Application {
  public initialize(): void {
    databaseConnection();
    const app: Express = express();
    const server = new backendServer(app);
    server.start();
  }
}

const application = new Application();
application.initialize();
