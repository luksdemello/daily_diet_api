import { beforeEach, describe, expect, it, vi } from "vitest";
import { MealRepository } from "../../repositories/meal/meal_repository";

import { MealRepositoryMock } from "../mock/meal_repository_mock";

import { MealNotFound } from "../../errors/meal_not_found_error";
import {
  FindMealsByUserInput,
  FindMealsByUserUseCase,
} from "./find_meals_by_useruse_case";

let mealRepository: MealRepository;
let sut: FindMealsByUserUseCase;
let input: FindMealsByUserInput;

const makeFindMealByIdInput = (): FindMealsByUserInput => ({
  user_id: "any_id",
});

describe("FindMealByIdUseCase", () => {
  beforeEach(() => {
    mealRepository = new MealRepositoryMock();
    sut = new FindMealsByUserUseCase(mealRepository);
    input = makeFindMealByIdInput();
  });

  it("should call findAllMealsByUser in MealRepository with correct values", async () => {
    const mealRepositorSpy = vi.spyOn(mealRepository, "findAllMealsByUser");
    await sut.execute(input);
    expect(mealRepositorSpy).toHaveBeenCalledWith(input.user_id);
  });

  it("should throws if findAllMealsByUser throws", async () => {
    vi.spyOn(mealRepository, "findAllMealsByUser").mockImplementationOnce(
      () => {
        throw new Error();
      },
    );
    const promise = sut.execute(input);
    expect(promise).rejects.toThrow();
  });

  it("should returns a meals list", async () => {
    const response = await sut.execute(input);
    expect(response.length).toBeGreaterThan(0);
  });
});
