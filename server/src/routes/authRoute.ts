import { FastifyInstance } from "fastify";
import { signin, signup } from "../controllers/authController";

export default async function (app: FastifyInstance) {
  app.get("/signin", signin);
  app.post("/signup", signup);
}
