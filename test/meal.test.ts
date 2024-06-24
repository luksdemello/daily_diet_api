import { execSync } from "child_process";
import request from "supertest";
import { app } from "../src/app";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { knexDb } from "../src/config/database/database";

describe("Meals routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await knexDb("users").delete();
    execSync("npm run knex migrate:rollback --all");
    execSync("npm run knex migrate:latest");
  });

  it("should be able to create a new meal", async () => {
    const userResponse = await request(app.server)
      .post("/users")
      .send({ name: "any_name", email: "johndoe@gmail.com" })
      .expect(201);

    const cookie =
      userResponse.get("Set-Cookie") != undefined
        ? userResponse.get("Set-Cookie")![0]
        : "";

    await request(app.server)
      .post("/meals")
      .set("Cookie", cookie)
      .send({
        name: "any_name",
        description: "any_description",
        is_on_diet: true,
        date: new Date().toISOString(),
      })
      .expect(201);
  });

  it("should be able to list all meals from a user", async () => {
    const userResponse = await request(app.server)
      .post("/users")
      .send({ name: "any_name", email: "johndoe@gmail.com" })
      .expect(201);

    const cookie =
      userResponse.get("Set-Cookie") != undefined
        ? userResponse.get("Set-Cookie")![0]
        : "";

    await request(app.server)
      .post("/meals")
      .set("Cookie", cookie)
      .send({
        name: "any_name",
        description: "any_description",
        is_on_diet: true,
        date: new Date(),
      })
      .expect(201);

    await request(app.server)
      .post("/meals")
      .set("Cookie", cookie)
      .send({
        name: "Lunch",
        description: "It's a lunch",
        is_on_diet: true,
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day after
      })
      .expect(201);

    const mealsResponse = await request(app.server)
      .get("/meals")
      .set("Cookie", cookie)
      .expect(200);

    expect(mealsResponse.body.meals).toHaveLength(2);

    expect(mealsResponse.body.meals[0].name).toBe("Lunch");
    expect(mealsResponse.body.meals[1].name).toBe("any_name");
  });

  it("should be able to show a single meal", async () => {
    const userResponse = await request(app.server)
      .post("/users")
      .send({ name: "any_name", email: "johndoe@gmail.com" })
      .expect(201);

    const cookie =
      userResponse.get("Set-Cookie") != undefined
        ? userResponse.get("Set-Cookie")![0]
        : "";

    await request(app.server)
      .post("/meals")
      .set("Cookie", cookie)
      .send({
        name: "any_name",
        description: "any_description",
        is_on_diet: true,
        date: new Date(),
      })
      .expect(201);

    const mealsResponse = await request(app.server)
      .get("/meals")
      .set("Cookie", cookie)
      .expect(200);

    const mealId = mealsResponse.body.meals[0].id;

    const mealResponse = await request(app.server)
      .get(`/meals/${mealId}`)
      .set("Cookie", cookie)
      .expect(200);

    expect(mealResponse.body).toEqual({
      meal: expect.objectContaining({
        name: "any_name",
        description: "any_description",
        is_on_diet: true,
      }),
    });
  });

  it("should be able to update a meal from a user", async () => {
    const userResponse = await request(app.server)
      .post("/users")
      .send({ name: "any_name", email: "any@email.com" })
      .expect(201);

    const cookie =
      userResponse.get("Set-Cookie") != undefined
        ? userResponse.get("Set-Cookie")![0]
        : "";

    await request(app.server)
      .post("/meals")
      .set("Cookie", cookie)
      .send({
        name: "any_name",
        description: "any_description",
        is_on_diet: true,
        date: new Date(),
      })
      .expect(201);

    const mealsResponse = await request(app.server)
      .get("/meals")
      .set("Cookie", cookie)
      .expect(200);

    const mealId = mealsResponse.body.meals[0].id;

    await request(app.server)
      .put(`/meals/${mealId}`)
      .set("Cookie", cookie)
      .send({
        name: "Dinner",
        description: "It's a dinner",
        is_on_diet: true,
        date: new Date(),
      })
      .expect(204);
  });

  it("should be able to delete a meal from a user", async () => {
    const userResponse = await request(app.server)
      .post("/users")
      .send({ name: "any_name", email: "johndoe@gmail.com" })
      .expect(201);

    const cookie =
      userResponse.get("Set-Cookie") != undefined
        ? userResponse.get("Set-Cookie")![0]
        : "";

    await request(app.server)
      .post("/meals")
      .set("Cookie", cookie)
      .send({
        name: "any_name",
        description: "any_description",
        is_on_diet: true,
        date: new Date(),
      })
      .expect(201);

    const mealsResponse = await request(app.server)
      .get("/meals")
      .set("Cookie", cookie)
      .expect(200);

    const mealId = mealsResponse.body.meals[0].id;

    await request(app.server)
      .delete(`/meals/${mealId}`)
      .set("Cookie", cookie)
      .expect(204);
  });

  it("should be able to get metrics from a user", async () => {
    const userResponse = await request(app.server)
      .post("/users")
      .send({ name: "any_name", email: "johndoe@gmail.com" })
      .expect(201);

    const cookie =
      userResponse.get("Set-Cookie") != undefined
        ? userResponse.get("Set-Cookie")![0]
        : "";

    await request(app.server)
      .post("/meals")
      .set("Cookie", cookie)
      .send({
        name: "any_name",
        description: "any_description",
        is_on_diet: true,
        date: new Date("2021-01-01T08:00:00"),
      })
      .expect(201);

    await request(app.server)
      .post("/meals")
      .set("Cookie", cookie)
      .send({
        name: "Lunch",
        description: "It's a lunch",
        is_on_diet: false,
        date: new Date("2021-01-01T12:00:00"),
      })
      .expect(201);

    await request(app.server)
      .post("/meals")
      .set("Cookie", cookie)
      .send({
        name: "Lanche",
        description: "Lanche da tarde",
        is_on_diet: true,
        date: new Date("2021-01-01T15:00:00"),
      })
      .expect(201);

    await request(app.server)
      .post("/meals")
      .set("Cookie", cookie)
      .send({
        name: "Jantar",
        description: "Jantar",
        is_on_diet: true,
        date: new Date("2021-01-01T20:00:00"),
      });

    await request(app.server)
      .post("/meals")
      .set("Cookie", cookie)
      .send({
        name: "Almoço",
        description: "Almoço",
        is_on_diet: true,
        date: new Date("2021-01-02T08:00:00"),
      });

    const metricsResponse = await request(app.server)
      .get("/meals/metrics")
      .set("Cookie", cookie)
      .expect(200);

    expect(metricsResponse.body).toEqual({
      totalMeals: 5,
      totalMealInsideDiet: 4,
      totalMealOutsideDiet: 1,
      bestOnDietSequence: 3,
    });
  });
});
