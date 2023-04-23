import { FastifyReply, FastifyRequest } from "fastify";
import { query as q } from "faunadb";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { client } from "../lib/fauna";

interface AuthMiddlewareRequest extends FastifyRequest {
  userID?: string;
}

export async function createDiscussion(
  req: AuthMiddlewareRequest,
  reply: FastifyReply
) {
  const createDiscussionBody = z.object({
    title: z.string(),
    content: z.string(),
  });

  const body = createDiscussionBody.parse(req.body);

  const discussionId = uuid();

  const newDiscussion = {
    id: discussionId,
    ...body,
    userID: req.userID,
  };

  try {
    await client.query(
      q.Create(q.Collection("discussions"), {
        data: newDiscussion,
      })
    );

    return reply.send(newDiscussion);
  } catch (error) {
    return reply.send(error);
  }
}
