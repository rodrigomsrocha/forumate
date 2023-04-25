import { FastifyInstance } from "fastify";
import {
  createDiscussion,
  deleteDiscussion,
  getAllDiscussions,
  getDiscussion,
  updateDiscussion,
} from "../controllers/discussionsController";
import { authMiddleware } from "../middlewares/authMiddleware";

export async function discussionsRoutes(app: FastifyInstance) {
  app.post("/discussions", { preValidation: authMiddleware }, createDiscussion);
  app.get("/discussions", getAllDiscussions);
  app.get("/discussions/:id", getDiscussion);
  app.patch(
    "/discussions/:id",
    { preValidation: authMiddleware },
    updateDiscussion
  );
  app.delete(
    "/discussions/:id",
    { preValidation: authMiddleware },
    deleteDiscussion
  );
}
