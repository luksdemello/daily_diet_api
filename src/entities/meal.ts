export class Meal {
  id: string;
  name: string;
  description: string;
  isOnDiet: boolean;
  created_at: Date;
  updated_at: Date;

  constructor({
    id,
    name,
    description,
    isOnDiet,
    created_at,
    updated_at,
  }: Meal) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isOnDiet = isOnDiet;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
