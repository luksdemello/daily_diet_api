import { app } from "./app.js";
import { env } from "./config/env/index.js";

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log("Server is running on port:", env.PORT);
  })
  .catch((err) => console.log(err));
