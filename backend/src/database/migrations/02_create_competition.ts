import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('competition', table => {
        table.increments('id').primary();

        table.integer('id_profile')
            .notNullable()
            .references('id')
            .inTable('profile');
            
        table.string('name').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('competition');
}