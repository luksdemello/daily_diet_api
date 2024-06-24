import { MealRepository } from "../../repositories/meal/meal_repository";
import { Meal } from "../../entities/meal";
import { MealNotFound } from "../../errors/meal_not_found_error";

export type FindMealByIdInput = {
  meal_id: string;
};

export class FindMealByIdUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute(input: FindMealByIdInput): Promise<Meal> {
    const meal = await this.mealRepository.findMealById(input.meal_id);
    if (!meal) {
      throw new MealNotFound();
    }
    return meal;
  }
}
