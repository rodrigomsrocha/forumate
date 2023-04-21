import Fastify from "fastify";

const app = Fastify();

app.get("/", () => {
  return { message: "Hello world" };
});

app
  .listen({ port: 3001 })
  .then(() => {
    console.log("✅ Server is running at http://localhost:3001");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
