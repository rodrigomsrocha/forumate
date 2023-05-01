import { FastifyReply, FastifyRequest } from "fastify";
import { query as q } from "faunadb";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { client } from "../lib/fauna";

type Discussion = {
  id: string;
  title: string;
  content: string;
  userId: string;
};

interface DiscussionsQuery {
  after?: {
    id: string;
  }[];
  data: {
    data: Discussion;
    ts: number;
    ref: {
      id: string;
    };
  }[];
}

interface CreateDiscussionRequest extends FastifyRequest {
  user?: {} | null;
}

export async function createDiscussion(
  req: CreateDiscussionRequest,
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
    userID: req.user.id,
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

export async function getAllDiscussions(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const getAllDiscussionsQuery = z.object({
    after: z.string().optional(),
  });
  const { after } = getAllDiscussionsQuery.parse(req.query);

  try {
    const response = await client.query<DiscussionsQuery>(
      q.Map(
        q.Paginate(q.Documents(q.Collection("discussions")), {
          size: 6,
          ...(after && { after: q.Ref(q.Collection("discussions"), after) }),
        }),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    );

    const discussions = response.data.map((discussion) => {
      return {
        ...discussion.data,
      };
    });

    return reply.send({
      after: response.after ? response.after[0].id : null,
      discussions,
    });
  } catch (error) {
    return reply.send(error);
  }
}

export async function getDiscussion(req: FastifyRequest, reply: FastifyReply) {
  const getDiscussionParams = z.object({
    id: z.string(),
  });

  const { id } = getDiscussionParams.parse(req.params);

  try {
    const { data } = await client
      .query<{ data: Discussion }>(
        q.Get(q.Match(q.Index("discussion_by_id"), q.Casefold(id)))
      )
      .catch(() => {
        return reply.status(404).send({ message: "Discussion not found" });
      });

    return reply.send({ discussion: data });
  } catch (error) {
    return reply.send(error);
  }
}

export async function updateDiscussion(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const updateDiscussionParams = z.object({
    id: z.string(),
  });
  const updateDiscussionBody = z.object({
    title: z.string(),
    content: z.string(),
  });

  const body = updateDiscussionBody.parse(req.body);
  const params = updateDiscussionParams.parse(req.params);

  try {
    const response = await client
      .query<{ data: Discussion }>(
        q.If(
          q.Equals(
            q.Select(
              ["data", "userID"],
              q.Get(q.Match(q.Index("discussion_by_id"), q.Casefold(params.id)))
            ),
            req.user.id
          ),
          q.Update(
            q.Select(
              ["ref"],
              q.Get(q.Match(q.Index("discussion_by_id"), q.Casefold(params.id)))
            ),
            { data: body }
          ),
          q.Abort("User is not authorized")
        )
      )
      .catch((error) => {
        if (error.description === "User is not authorized") {
          return reply.status(401).send({ message: "User not authorized" });
        } else {
          return reply.status(404).send({ message: "Discussion not found" });
        }
      });

    return reply.send({ discussion: response.data }).status(200);
  } catch (error) {
    return reply.send(error);
  }
}

export async function deleteDiscussion(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const deleteDiscussionParams = z.object({
    id: z.string(),
  });

  const params = deleteDiscussionParams.parse(req.params);

  try {
    await client
      .query<{ data: Discussion }>(
        q.If(
          q.Equals(
            q.Select(
              ["data", "userID"],
              q.Get(q.Match(q.Index("discussion_by_id"), q.Casefold(params.id)))
            ),
            req.user.id
          ),
          q.Delete(
            q.Select(
              ["ref"],
              q.Get(q.Match(q.Index("discussion_by_id"), q.Casefold(params.id)))
            )
          ),
          q.Abort("User is not authorized")
        )
      )
      .catch((error) => {
        if (error.description === "User is not authorized") {
          return reply.status(401).send({ message: "User not authorized" });
        } else {
          return reply.status(404).send({ message: "Discussion not found" });
        }
      });

    return reply.status(204);
  } catch (error) {
    return reply.send(error);
  }
}
