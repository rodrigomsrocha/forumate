import { FastifyInstance } from "fastify";
import {
  createDiscussion,
  getAllDiscussions,
  getDiscussion,
} from "../controllers/discussionsController";
import { authMiddleware } from "../middlewares/authMiddleware";

export async function discussionsRoutes(app: FastifyInstance) {
  app.post("/discussions", { preValidation: authMiddleware }, createDiscussion);
  app.get("/discussions", getAllDiscussions);
  app.get("/discussions/:id", getDiscussion);
}
