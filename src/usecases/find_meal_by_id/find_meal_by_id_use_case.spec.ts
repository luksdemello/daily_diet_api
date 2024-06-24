import { beforeEach, describe, expect, it, vi } from "vitest";
import { MealRepository } from "../../repositories/meal/meal_repository";

import { MealRepositoryMock } from "../mock/meal_repository_mock";
import {
  FindMealByIdInput,
  FindMealByIdUseCase,
} from "./find_meal_by_id_use_case";
import { MealNotFound } from "../../errors/meal_not_found_error";

let mealRepository: MealRepository;
let sut: FindMealByIdUseCase;
let input: FindMealByIdInput;

const makeFindMealByIdInput = (): FindMealByIdInput => ({
  meal_id: "any_id",
});

describe("FindMealByIdUseCase", () => {
  beforeEach(() => {
    mealRepository = new MealRepositoryMock();
    sut = new FindMealByIdUseCase(mealRepository);
    input = makeFindMealByIdInput();
  });

  it("should call findMealById in MealRepository with correct values", async () => {
    const mealRepositorSpy = vi.spyOn(mealRepository, "findMealById");
    await sut.execute(input);
    expect(mealRepositorSpy).toHaveBeenCalledWith(input.meal_id);
  });

  it("should throws if meal not found", async () => {
    vi.spyOn(mealRepository, "findMealById").mockImplementationOnce(
      async () => {
        return null;
      },
    );
    const promise = sut.execute(input);
    expect(promise).rejects.toThrow(MealNotFound);
  });

  it("should throws if findMealById throws", async () => {
    vi.spyOn(mealRepository, "findMealById").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.execute(input);
    expect(promise).rejects.toThrow();
  });

  it("should returns a meal", async () => {
    const response = await sut.execute(input);
    expect(response.id).toBeTruthy();
    expect(response.name).toBeTruthy();
    expect(response.description).toBeTruthy();
  });
});
