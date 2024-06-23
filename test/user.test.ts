import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../src/app";
import request from "supertest";
import { execSync } from "node:child_process";

describe("User routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync("npm run knex migrate:rollback --all");
    execSync("npm run knex migrate:latest");
  });

  it("should be able to create a new user", async () => {
    const response = await request(app.server)
      .post("/users")
      .send({
        name: "any_name",
        email: "any@email.com",
      })
      .expect(201);

    const cookies = response.get("Set-Cookie");

    expect(cookies).toEqual(
      expect.arrayContaining([expect.stringContaining("session_id")]),
    );
  });
});
