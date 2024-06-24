import { beforeEach, describe, expect, it, vi } from "vitest";
import { MealRepository } from "../../repositories/meal/meal_repository";

import { MealRepositoryMock } from "../mock/meal_repository_mock";
import { UpdateMealInput, UpdateMealUseCase } from "./update_meal_use_case";

let mealRepository: MealRepository;
let sut: UpdateMealUseCase;
let input: UpdateMealInput;

const makeUpdateMealInput = (): UpdateMealInput => ({
  date: new Date(),
  name: "any_name",
  description: "any_description",
  is_on_diet: false,
  id: "any_id",
  update_at: new Date(),
});

describe("UpdateMealUseCase", () => {
  beforeEach(() => {
    mealRepository = new MealRepositoryMock();
    sut = new UpdateMealUseCase(mealRepository);
    input = makeUpdateMealInput();
  });

  it("should call updateMeal in MealRepository with correct values", async () => {
    const mealRepositorSpy = vi.spyOn(mealRepository, "updateMeal");
    await sut.execute(input);
    expect(mealRepositorSpy).toHaveBeenCalledOnce();
    expect(mealRepositorSpy).toHaveBeenCalledWith(input);
  });

  it("should throws if updateMeal throws", async () => {
    vi.spyOn(mealRepository, "updateMeal").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.execute(input);
    expect(promise).rejects.toThrow();
  });
});
