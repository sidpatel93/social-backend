import winston from "winston";

class Logger {
  public createLogger(level: string): winston.Logger {
    return winston.createLogger({
      level: level,
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    });
  }
}

const logger = new Logger();
export default logger;
