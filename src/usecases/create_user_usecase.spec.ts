import { describe, it, expect } from "vitest";
import { CreateUserUseCase } from "./create_user_usecase.js";
import { User } from "../entities/user.js";

describe("CreateUserUseCase", () => {
  it("shoud return an user", async () => {
    const sut = new CreateUserUseCase();
    const response = await sut.execute();
    expect(response).toBeInstanceOf(User);
  });
});
