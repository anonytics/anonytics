import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable('visit')) {
    return;
  }
  return knex.schema.createTable('visit', table => {
    table.increments('id');
    table.string('userId').notNullable();
    table.string('url').notNullable();
    table.string('path').notNullable();
    table.string('title').notNullable();
    table.string('referrer');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('visit');
}
