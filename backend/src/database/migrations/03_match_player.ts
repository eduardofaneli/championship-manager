import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('match_player', table => {
        table.increments('id').primary();

        table.integer('competition_id')
            .notNullable()
            .references('id')
            .inTable('competition');

        table.integer('player_id')
            .notNullable()
            .references('id')
            .inTable('players');

        table.integer('opponent_id')
            .notNullable()
            .references('id')
            .inTable('players');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('match_player');
}