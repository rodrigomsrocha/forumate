import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import { query as q } from "faunadb";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { client } from "../lib/fauna";

export async function signin(req: FastifyRequest, reply: FastifyReply) {
  try {
    reply.status(200).send({ message: "it's working" });
  } catch (error) {
    reply.send(error);
  }
}

export async function signup(req: FastifyRequest, reply: FastifyReply) {
  // validate request body
  const signupBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, name, password } = signupBody.parse(req.body);

  // hash password berfore saving the user
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    // check if user already
    const userExists = q.Exists(
      q.Match(q.Index("user_by_email"), q.Casefold(email))
    );

    if (userExists) {
      return reply.status(400).send({ message: "User already exists" });
    }

    // create one if not
    await client.query(
      q.Create(q.Collection("users"), {
        data: { email, name, password: hashedPassword },
      })
    );

    // return token
    const token = jwt.sign({ email, name }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return reply.status(201).send({ token, user: { email, name } });
  } catch (error) {
    console.error(error);

    return reply.send(error);
  }
}
