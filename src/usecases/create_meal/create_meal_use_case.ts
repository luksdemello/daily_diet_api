import { randomUUID } from "crypto";
import { MealRepository } from "../../repositories/meal/meal_repository";

export type CreateMealInput = {
  name: string;
  description: string;
  is_ond_diet: boolean;
  date: Date;
  user_id: string;
};

export class CreateMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute(input: CreateMealInput) {
    const currentDate = new Date();
    await this.mealRepository.createMeal({
      name: input.name,
      date: input.date,
      description: input.description,
      is_on_diet: input.is_ond_diet,
      id: randomUUID(),
      user_id: input.user_id,
      created_at: currentDate,
      update_at: currentDate,
    });
  }
}
