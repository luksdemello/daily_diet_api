import { app } from "./app.js";

app.listen({ port: 3000 }).then(() => {
  console.log("Server is running on port:", 3000);
});
