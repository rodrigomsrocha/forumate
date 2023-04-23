import { FastifyReply, FastifyRequest } from "fastify";
import * as jwt from "jsonwebtoken";

interface AuthMiddlewareRequest extends FastifyRequest {
  userID?: string;
}

export async function authMiddleware(
  req: AuthMiddlewareRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.status(401).send({ message: "You're not authorized" });
    }

    const token = authHeader.slice("Bearer ".length);

    const { id } = jwt.verify(token, process.env.JWT_SECRET as string);

    req.userID = id;
    return;
  } catch (error) {
    return reply.status(401).send({ message: "You're not authorized" });
  }
}
