import dotenv from "dotenv";
import faunadb from "faunadb";

dotenv.config();

export const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET as string,
});
