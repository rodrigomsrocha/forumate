import { createClerkClient } from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";

interface AuthMiddlewareRequest extends FastifyRequest {
  user?: {} | null;
}

const clerkClient = createClerkClient({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function authMiddleware(
  req: AuthMiddlewareRequest,
  reply: FastifyReply
) {
  try {
    // const { userId } = getAuth(req);
    // if (!userId) {
    //   return reply.code(403).send();
    // }

    const user = true
      ? await clerkClient.users.getUser("user_2PArCa1M0kYXov1HAPmF45kxbot")
      : null;

    req.user = user;
    return;
  } catch (error) {
    console.log(error);

    return reply.status(401).send({ message: "You're not authenticated" });
  }
}
