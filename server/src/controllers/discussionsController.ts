import { FastifyReply, FastifyRequest } from "fastify";
import { query as q } from "faunadb";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { client } from "../lib/fauna";

interface DiscussionsQuery {
  after?: {
    id: string;
  }[];
  data: {
    data: {
      id: string;
      title: string;
      content: string;
      userId: string;
    };
    ts: number;
    ref: {
      id: string;
    };
  }[];
}

interface CreateDiscussionRequest extends FastifyRequest {
  userID?: string;
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
        ts: discussion.ts,
        id: discussion.ref.id,
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
