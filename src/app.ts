import { fastify } from "fastify";
import { knexDb } from "./database/database.js";

const app = fastify();

app.get("/", async () => {
  try {
    const test = await knexDb("information_schema").select("*");
    console.log(test);
    return test;
  } catch (err) {
    console.log(err);
    return err;
  }
});

export { app };
