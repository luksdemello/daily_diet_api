import { MealRepository } from "../../repositories/meal/meal_repository";
import { Meal } from "../../entities/meal";

export type FindMealsByUserInput = {
  user_id: string;
};

export class FindMealsByUserUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute(input: FindMealsByUserInput): Promise<Meal[]> {
    const meal = await this.mealRepository.findAllMealsByUser(input.user_id);

    return meal;
  }
}
