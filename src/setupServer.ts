import {
  Application,
  json,
  urlencoded,
  Response,
  Request,
  NextFunction,
} from "express";
import { Server } from "http";
import cors from "cors";
import helmet from "helmet";
import cookieSession from "cookie-session";
import compression from "compression";
import HTTP_STATUS from "http-status-codes";

export class backendServer {
  private app: Application;

  constructor(appInstance: Application) {
    this.app = appInstance;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.use(
      cookieSession({
        name: "session",
        keys: ["key1", "key2"],
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
      })
    );
    app.use(helmet());
    app.use(
      cors({
        origin: "*",
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      })
    );
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: "50mb" }));
    app.use(urlencoded({ extended: true }));
  }

  private routesMiddleware(app: Application): void {}

  private globalErrorHandler(app: Application): void {}

  private startServer(app: Application): void {}

  private createSocketIO(httpServer: Server): void {}

  private startHttpServer(httpServer: Server): void {}
}
