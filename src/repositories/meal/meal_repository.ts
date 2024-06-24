import { Meal } from "../../entities/meal";
import { CreateMealDto } from "./dto/create_meal_dto";
import { UpdateMealDto } from "./dto/update_meal_dto";

export interface MealRepository {
  createMeal(data: CreateMealDto): Promise<void>;
  findMealById(meal_id: string): Promise<Meal | null>;
  findAllMealsByUser(user_id: string): Promise<Meal[]>;
  updateMeal(data: UpdateMealDto): Promise<void>;
  deleteMeal(meal_id: string): Promise<void>;
  totalMealInDiet(user_id: string, is_on_diet: boolean): Promise<number>;
}
