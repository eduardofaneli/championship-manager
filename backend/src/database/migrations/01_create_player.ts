import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('players', table => {
    table.increments('id').primary();
    // table.string('image').notNullable();

    table.integer('id_profile')
      .notNullable()
      .references('id')
      .inTable('profile');

    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('players');
}