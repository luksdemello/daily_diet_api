import { MealRepository } from "../../repositories/meal/meal_repository";

export type GetMealMetricsInput = {
  user_id: string;
};

export type GetMealMetricsOutput = {
  totalMeals: number;
  totalMealInsideDiet: number;
  totalMealOutsideDiet: number;
  bestOnDietSequence: number;
};

export class GetMealMetricsUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute(input: GetMealMetricsInput): Promise<GetMealMetricsOutput> {
    const [totalMealInsideDiet, totalMealOutsideDiet, totalMeals] =
      await Promise.all([
        this.mealRepository.totalMealInDiet(input.user_id, true),
        this.mealRepository.totalMealInDiet(input.user_id, false),
        this.mealRepository.findAllMealsByUser(input.user_id),
      ]);

    const dietSequence = totalMeals.reduce(
      (acc, curr) => {
        if (curr.is_on_diet) {
          acc.currentDietSequence += 1;
        } else {
          acc.currentDietSequence = 0;
        }

        if (acc.currentDietSequence > acc.bestOnDietSequence) {
          acc.bestOnDietSequence = acc.currentDietSequence;
        }

        return acc;
      },
      {
        bestOnDietSequence: 0,
        currentDietSequence: 0,
      },
    );

    return {
      bestOnDietSequence: dietSequence.bestOnDietSequence,
      totalMeals: totalMeals.length,
      totalMealOutsideDiet: totalMealOutsideDiet,
      totalMealInsideDiet: totalMealInsideDiet,
    };
  }
}
