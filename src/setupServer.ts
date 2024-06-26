import {
  Application,
  json,
  urlencoded,
  Response,
  Request,
  NextFunction,
} from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import cookieSession from "cookie-session";
import compression from "compression";
import HTTP_STATUS from "http-status-codes";
import { config } from "./config";
import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import applicationRoutes from "./routes";
import {
  CustomError,
  IErrorResponse,
} from "./shared/global/helpers/errorHandler";
import logger from "./shared/global/helpers/logger";

const SERVER_PORT = 5000;
const log = logger.createLogger("info");

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
        keys: [config.SECRET_KEY_1, config.SECRET_KEY_2],
        maxAge: 24 * 60 * 60 * 1000,
        secure: config.NODE_ENV !== "development",
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

  private routesMiddleware(app: Application): void {
    applicationRoutes(app);
  }

  private globalErrorHandler(app: Application): void {
    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: `${req.originalUrl} not found` });
    });
    app.use(
      (
        err: IErrorResponse,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        log.error(`Error: ${err.message}`);
        if (err instanceof CustomError) {
          return res.status(err.statusCode).json(err.serializedErrors());
        }
        next();
      }
    );
  }

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer = new http.Server(app);
      this.startHttpServer(httpServer);
      const sockerIO = await this.createSocketIO(httpServer);
      this.socketIOConnections(sockerIO);
    } catch (error) {
      log.error(`Error starting server: ${error}`);
    }
  }

  private async createSocketIO(httpServer: http.Server): Promise<Server> {
    try {
      const io: Server = new Server(httpServer, {
        cors: {
          origin: config.CLIENT_URL,
          methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        },
      });

      const publishClient = createClient({ url: config.REDIS_HOST });
      const subscribeClient = publishClient.duplicate();
      await Promise.all([publishClient.connect(), subscribeClient.connect()]);
      io.adapter(createAdapter(publishClient, subscribeClient));
      return io;
    } catch (error) {
      log.error(`Error creating socket.io: ${error}`);
      throw new Error("Error creating socket.io");
    }
  }

  private startHttpServer(httpServer: http.Server): void {
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Server is running on port ${SERVER_PORT}`);
    });
  }

  private socketIOConnections(io: Server): void {}
}
