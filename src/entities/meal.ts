export class Meal {
  id: string;
  name: string;
  description: string;
  user_id: string;
  is_on_diet: boolean;
  created_at: Date;
  updated_at: Date;

  constructor({
    id,
    name,
    description,
    is_on_diet,
    user_id,
    created_at,
    updated_at,
  }: Meal) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.user_id = user_id;
    this.is_on_diet = is_on_diet;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
