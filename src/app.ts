import { fastify } from "fastify";
import cookie from "@fastify/cookie";
import { userRoutes } from "./routes/user.routes";

const app = fastify();
app.register(cookie);

app.register(userRoutes, { prefix: "users" });

export { app };
