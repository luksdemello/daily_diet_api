import { knexDb } from "../../config/database/database";
import { Meal } from "../../entities/meal";
import { CreateMealDto } from "./dto/create_meal_dto";
import { UpdateMealDto } from "./dto/update_meal_dto";
import { MealRepository } from "./meal_repository";

export class PostgresMealRepository implements MealRepository {
  async createMeal(data: CreateMealDto): Promise<void> {
    await knexDb("meals").insert({
      id: data.id,
      name: data.name,
      description: data.description,
      is_on_diet: data.is_on_diet,
      date: data.date,
      user_id: data.user_id,
    });
  }
  async findMealById(meal_id: string): Promise<Meal | null> {
    const response = await knexDb("meals").where({ id: meal_id }).first();
    if (!response) {
      return null;
    }
    const meal = new Meal({
      id: response.id,
      name: response.name,
      description: response.description,
      is_on_diet: response.is_on_diet,
      user_id: response.user_id,
      created_at: response.created_at,
      updated_at: response.updated_at,
    });

    return meal;
  }
  async findAllMealsByUser(user_id: string): Promise<Meal[]> {
    const meals: Meal[] = [];
    const response = await knexDb("meals")
      .where({ user_id })
      .orderBy("date", "desc");
    for (const item of response) {
      const meal = new Meal({
        id: item.id,
        name: item.name,
        description: item.description,
        is_on_diet: item.is_on_diet,
        user_id: item.user_id,
        created_at: item.created_at,
        updated_at: item.updated_at,
      });
      meals.push(meal);
    }

    return meals;
  }
  async updateMeal(data: UpdateMealDto): Promise<void> {
    await knexDb("meals").where({ id: data.id }).update({
      id: data.id,
      name: data.name,
      description: data.description,
      is_on_diet: data.is_on_diet,
      updated_at: data.update_at,
    });
  }
  async deleteMeal(meal_id: string): Promise<void> {
    knexDb("meals").where({ id: meal_id }).delete();
  }
  async totalMealInDiet(user_id: string, is_on_diet: boolean): Promise<number> {
    const response = await knexDb("meals")
      .where({ user_id, is_on_diet })
      .count("id")
      .first();
    return response?.count != undefined ? +response!.count : 0;
  }
}
