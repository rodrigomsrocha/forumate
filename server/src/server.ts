import Fastify from "fastify";

import { authRoutes } from "./routes/authRoute";

const app = Fastify();

app.register(authRoutes);

app
  .listen({ port: 3001 })
  .then(() => {
    console.log("✅ Server is running at http://localhost:3001");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
