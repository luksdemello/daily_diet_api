import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("meals", (table) => {
    table.uuid("id").primary();
    table.text("name").notNullable();
    table.text("description").notNullable();
    table.text("user_id").notNullable();
    table.boolean("is_on_diet").defaultTo(false);
    table.timestamp("date");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("meals");
}
