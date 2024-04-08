import express, { Express } from "express";
import { backendServer } from "./setupServer";

class Application {
  public initialize(): void {
    const app: Express = express();
    const server = new backendServer(app);
    server.start();
  }
}

const application = new Application();
application.initialize();
