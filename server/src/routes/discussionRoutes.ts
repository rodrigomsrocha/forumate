import * as dotenv from "dotenv";
dotenv.config();

import { clerkPlugin } from "@clerk/fastify";
import { FastifyInstance } from "fastify";
import {
  createDiscussion,
  deleteDiscussion,
  getAllDiscussions,
  getDiscussion,
  updateDiscussion,
} from "../controllers/discussionsController";
import { authMiddleware } from "../middlewares/authMiddleware";

const clerkOpts = {
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
};

export async function discussionsRoutes(app: FastifyInstance) {
  app.register(clerkPlugin, clerkOpts);

  app.post("/discussions", { preHandler: authMiddleware }, createDiscussion);
  app.get("/discussions", getAllDiscussions);
  app.get("/discussions/:id", getDiscussion);
  app.patch(
    "/discussions/:id",
    { preHandler: authMiddleware },
    updateDiscussion
  );
  app.delete(
    "/discussions/:id",
    { preHandler: authMiddleware },
    deleteDiscussion
  );
}
