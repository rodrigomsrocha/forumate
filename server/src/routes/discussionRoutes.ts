import { FastifyInstance } from "fastify";
import {
  createDiscussion,
  getAllDiscussions,
} from "../controllers/discussionsController";
import { authMiddleware } from "../middlewares/authMiddleware";

export async function discussionsRoutes(app: FastifyInstance) {
  app.post("/discussions", { preValidation: authMiddleware }, createDiscussion);
  app.get("/discussions", getAllDiscussions);
}
