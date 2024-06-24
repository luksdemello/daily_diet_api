import { beforeEach, describe, expect, it, vi } from "vitest";
import { MealRepository } from "../../repositories/meal/meal_repository";
import { CreateMealInput, CreateMealUseCase } from "./create_meal_use_case";
import { MealRepositoryMock } from "../mock/meal_repository_mock";

let mealRepository: MealRepository;
let sut: CreateMealUseCase;
let input: CreateMealInput;

const makeCreateMealInput = (): CreateMealInput => ({
  date: new Date(),
  name: "any_name",
  description: "any_description",
  is_ond_diet: false,
  user_id: "any_user",
});

describe("CreateMealUseCase", () => {
  beforeEach(() => {
    mealRepository = new MealRepositoryMock();
    sut = new CreateMealUseCase(mealRepository);
    input = makeCreateMealInput();
  });

  it("should call createMeal in MealRepository", async () => {
    const mealRepositorSpy = vi.spyOn(mealRepository, "createMeal");
    await sut.execute(input);
    expect(mealRepositorSpy).toHaveBeenCalledOnce();
  });

  it("should throws if createMeal throws", async () => {
    vi.spyOn(mealRepository, "createMeal").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.execute(input);
    expect(promise).rejects.toThrow();
  });
});
