import { MealRepository } from "../../repositories/meal/meal_repository";

export type UpdateMealInput = {
  id: string;
  name: string;
  description: string;
  is_on_diet: boolean;
  update_at: Date;
  date: Date;
};

export class UpdateMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute(input: UpdateMealInput) {
    await this.mealRepository.updateMeal(input);
  }
}
