import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import { query as q } from "faunadb";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { client } from "../lib/fauna";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

export async function signin(req: FastifyRequest, reply: FastifyReply) {
  // validate request body
  const signinBody = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = signinBody.parse(req.body);

  try {
    const { data: user } = await client
      .query<{ data: User }>(
        q.Get(q.Match(q.Index("user_by_email"), q.Casefold(email)))
      )
      .catch(() => {
        return reply.status(404).send({ message: "Incorrect email" });
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return reply.status(404).send({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return reply
      .status(200)
      .send({ token, user: { email, name: user.name, id: user.id } });
  } catch (error) {
    console.error(error);

    return reply.send(error);
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
  const hashedPassword = hashPassword(password);
  const id = uuid();

  try {
    // check if user already
    const userExists = await client.query(
      q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))
    );

    if (userExists) {
      return reply.status(400).send({ message: "User already exists" });
    }

    // create one if not
    await client.query(
      q.Create(q.Collection("users"), {
        data: { email, name, password: hashedPassword, id },
      })
    );

    // return token
    const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return reply.status(201).send({ token, user: { email, name, id } });
  } catch (error) {
    console.error(error);

    return reply.send(error);
  }
}

export async function resetPassword(req: FastifyRequest, reply: FastifyReply) {
  // vaalidate req body
  const resetPasswordBody = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const { email, password } = resetPasswordBody.parse(req.body);

  try {
    // get user and throw error if not found
    const user = await client
      .query<{ ref: any; data: User }>(
        q.Get(q.Match(q.Index("user_by_email"), q.Casefold(email)))
      )
      .catch(() => {
        return reply.status(404).send({ message: "User not found" });
      });

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.data.password
    );

    if (isPasswordCorrect) {
      return reply
        .status(400)
        .send({ message: "Your new password cannot be the same" });
    }

    // update than
    const hashedPassword = hashPassword(password);

    await client.query(
      q.Update(user.ref, { data: { password: hashedPassword } })
    );

    return reply.status(200).send();
  } catch (error) {
    return reply.send(error);
  }
}
