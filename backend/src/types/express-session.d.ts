import "express-session";

declare module "express-session" {
  interface SessionData {
    user?: {
      id: number;
      name: string;
      email: string;
      createdAt?: string; // opcional, útil si lo envías al frontend
      updatedAt?: string;
    };
  }
}
