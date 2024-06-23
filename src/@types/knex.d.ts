import knex from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    users: {
      id: string;
      name: string;
      email: string;
      session_id: string;
      created_at: Date;
      updated_at: Date;
    };

    meals: {
      id: string;
      name: string;
      description: string;
      is_on_diet: string;
      created_at: Date;
      updated_at: Date;
    };
  }
}
