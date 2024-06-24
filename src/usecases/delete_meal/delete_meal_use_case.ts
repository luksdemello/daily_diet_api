import { MealRepository } from "../../repositories/meal/meal_repository";

export type DeleteMealInput = {
  meal_id: string;
};

export class DeleteMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute(input: DeleteMealInput) {
    await this.mealRepository.deleteMeal(input.meal_id);
  }
}
