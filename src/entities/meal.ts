export class Meal {
  id: string;
  name: string;
  description: string;
  is_on_diet: boolean;
  created_at: Date;
  updated_at: Date;

  constructor({
    id,
    name,
    description,
    is_on_diet,
    created_at,
    updated_at,
  }: Meal) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.is_on_diet = is_on_diet;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
