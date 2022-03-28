declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PASSWORD: string;
      SESSION_SECRET: string;
      DATABASE_URL: string;
      REDIS_URL: string;
      PORT: string;
      CORS_ORIGIN: string;
      FRONT: string;
    }
  }
}

export {};
