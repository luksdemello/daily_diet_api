import { fastify } from "fastify";
import cookie from "@fastify/cookie";
import { userRoutes } from "./routes/user.routes";
import { mealRoutes } from "./routes/meal.routes";

const app = fastify();
app.register(cookie);

app.register(userRoutes, { prefix: "users" });
app.register(mealRoutes, { prefix: "meals" });

export { app };
