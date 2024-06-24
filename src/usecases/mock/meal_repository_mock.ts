import { Meal } from "../../entities/meal";
import { CreateMealDto } from "../../repositories/meal/dto/create_meal_dto";
import { UpdateMealDto } from "../../repositories/meal/dto/update_meal_dto";
import { MealRepository } from "../../repositories/meal/meal_repository";

export class MealRepositoryMock implements MealRepository {
  async createMeal(data: CreateMealDto): Promise<void> {}
  async findMealById(meal_id: string): Promise<Meal | null> {
    return null;
  }
  async findAllMealsByUser(user_id: string): Promise<Meal[]> {
    return [];
  }
  async updateMeal(data: UpdateMealDto): Promise<void> {}
  async deleteMeal(meal_id: string): Promise<void> {}
  async totalMealInDiet(user_id: string, is_on_diet: boolean): Promise<number> {
    return 0;
  }
}