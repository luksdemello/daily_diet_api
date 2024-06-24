import { Meal } from "../../entities/meal";
import { CreateMealDto } from "../../repositories/meal/dto/create_meal_dto";
import { UpdateMealDto } from "../../repositories/meal/dto/update_meal_dto";
import { MealRepository } from "../../repositories/meal/meal_repository";

const makeMealsList = () => [
  new Meal({
    id: "any_id",
    created_at: new Date(),
    description: "any_description",
    is_on_diet: false,
    name: "any_name",
    updated_at: new Date(),
    user_id: "any_id",
  }),
  new Meal({
    id: "any_id",
    created_at: new Date(),
    description: "any_description",
    is_on_diet: true,
    name: "any_name",
    updated_at: new Date(),
    user_id: "any_id",
  }),
];

export class MealRepositoryMock implements MealRepository {
  async createMeal(data: CreateMealDto): Promise<void> {}
  async findMealById(meal_id: string): Promise<Meal | null> {
    return new Meal({
      id: meal_id,
      created_at: new Date(),
      description: "any_description",
      is_on_diet: false,
      name: "any_name",
      updated_at: new Date(),
      user_id: "any_id",
    });
  }
  async findAllMealsByUser(user_id: string): Promise<Meal[]> {
    return makeMealsList();
  }
  async updateMeal(data: UpdateMealDto): Promise<void> {}
  async deleteMeal(meal_id: string): Promise<void> {}
  async totalMealInDiet(user_id: string, is_on_diet: boolean): Promise<number> {
    return makeMealsList().filter((meal) => meal.is_on_diet == is_on_diet)
      .length;
  }
}
