export class MealNotFound extends Error {
  constructor() {
    super("Meal not founde");
    this.name = "MealNotFound";
  }
}
