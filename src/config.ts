import dotenv from "dotenv";
dotenv.config({});
import cloudinary from "cloudinary";

class Config {
  public DATABASE_URL: string;
  public JWT_TOKEN: string;
  public NODE_ENV: string;
  public SECRET_KEY_1: string;
  public SECRET_KEY_2: string;
  public CLIENT_URL: string;
  public REDIS_HOST: string;
  public CLOUD_NAME: string;
  public CLOUD_API_KEY: string;
  public CLOUD_API_SECRET: string;

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || "";
    this.JWT_TOKEN = process.env.JWT_TOKEN || "";
    this.NODE_ENV = process.env.NODE_ENV || "";
    this.SECRET_KEY_1 = process.env.SECRET_KEY_1 || "";
    this.SECRET_KEY_2 = process.env.SECRET_KEY_2 || "";
    this.CLIENT_URL = process.env.CLIENT_URL || "";
    this.REDIS_HOST = process.env.REDIS_HOST || "";
    this.CLOUD_NAME = process.env.CLOUD_NAME || "";
    this.CLOUD_API_KEY = process.env.CLOUD_API_KEY || "";
    this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || "";
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Missing value for environment variable: ${key}`);
      }
    }
  }
  public cloudinaryConfig(): void {
    cloudinary.v2.config({
      cloud_name: this.CLOUD_NAME,
      api_key: this.CLOUD_API_KEY,
      api_secret: this.CLOUD_API_SECRET,
    });
  }
}

export const config: Config = new Config();
