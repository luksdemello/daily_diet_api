import { beforeEach, describe, expect, it, vi } from "vitest";
import { MealRepository } from "../../repositories/meal/meal_repository";

import { MealRepositoryMock } from "../mock/meal_repository_mock";
import { DeleteMealInput, DeleteMealUseCase } from "./delete_meal_use_case";

let mealRepository: MealRepository;
let sut: DeleteMealUseCase;
let input: DeleteMealInput;

const makeDeleteMealInput = (): DeleteMealInput => ({
  meal_id: "any_id",
});

describe("DeleteMealUseCase", () => {
  beforeEach(() => {
    mealRepository = new MealRepositoryMock();
    sut = new DeleteMealUseCase(mealRepository);
    input = makeDeleteMealInput();
  });

  it("should call deleteMeal in MealRepository with correct values", async () => {
    const mealRepositorSpy = vi.spyOn(mealRepository, "deleteMeal");
    await sut.execute(input);
    expect(mealRepositorSpy).toHaveBeenCalledOnce();
    expect(mealRepositorSpy).toHaveBeenCalledWith(input.meal_id);
  });

  it("should throws if deleteMeal throws", async () => {
    vi.spyOn(mealRepository, "deleteMeal").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.execute(input);
    expect(promise).rejects.toThrow();
  });
});
