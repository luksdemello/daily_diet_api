import { beforeEach, describe, expect, it, vi } from "vitest";
import { MealRepository } from "../../repositories/meal/meal_repository";

import { MealRepositoryMock } from "../mock/meal_repository_mock";

import {
  GetMealMetricsInput,
  GetMealMetricsUseCase,
} from "./get_meal_metrics_use_case";

let mealRepository: MealRepository;
let sut: GetMealMetricsUseCase;
let input: GetMealMetricsInput;

const makeGetMealMetricsInput = (): GetMealMetricsInput => ({
  user_id: "any_id",
});

describe("GetMealMetricsUseCase", () => {
  beforeEach(() => {
    mealRepository = new MealRepositoryMock();
    sut = new GetMealMetricsUseCase(mealRepository);
    input = makeGetMealMetricsInput();
  });

  it("should call findAllMealsByUser in MealRepository with correct values", async () => {
    const mealRepositorSpy = vi.spyOn(mealRepository, "findAllMealsByUser");
    await sut.execute(input);
    expect(mealRepositorSpy).toHaveBeenCalledWith(input.user_id);
  });

  it("should call totalMealInDiet in MealRepository with correct values", async () => {
    const mealRepositorSpy = vi.spyOn(mealRepository, "totalMealInDiet");
    await sut.execute(input);
    expect(mealRepositorSpy).toHaveBeenCalledWith(input.user_id, true);
  });

  it("should call totalMealOutDiet in MealRepository with correct values", async () => {
    const mealRepositorSpy = vi.spyOn(mealRepository, "totalMealInDiet");
    await sut.execute(input);
    expect(mealRepositorSpy).toHaveBeenCalledWith(input.user_id, false);
  });

  it("should return an output", async () => {
    const response = await sut.execute(input);
    expect(response.totalMeals).toBe(2);
    expect(response.totalMealInsideDiet).toBe(1);
    expect(response.totalMealOutsideDiet).toBe(1);
    expect(response.bestOnDietSequence).toBe(1);
  });
});
