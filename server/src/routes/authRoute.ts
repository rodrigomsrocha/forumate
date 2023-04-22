import { FastifyInstance } from "fastify";
import { resetPassword, signin, signup } from "../controllers/authController";

export async function authRoutes(app: FastifyInstance) {
  app.post("/signin", signin);
  app.post("/signup", signup);
  app.post("/reset-password", resetPassword);
}
