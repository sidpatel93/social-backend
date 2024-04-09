import express, { Express } from "express";
import { backendServer } from "./setupServer";
import databaseConnection from "./setupDatabase";
import { config } from "./config";

class Application {
  public initialize(): void {
    this.loadConfig();
    databaseConnection();
    const app: Express = express();
    const server = new backendServer(app);
    server.start();
  }
  private loadConfig(): void {
    config.validateConfig();
  }
}

const application = new Application();
application.initialize();
