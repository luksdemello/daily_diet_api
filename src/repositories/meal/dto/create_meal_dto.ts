export type CreateMealDto = {
  id: string;
  name: string;
  description: string;
  is_on_diet: boolean;
  user_id: string;
  date: Date;
  created_at: Date;
  update_at: Date;
};
