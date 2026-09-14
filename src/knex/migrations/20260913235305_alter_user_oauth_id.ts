import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', table => {
    table.string('password').nullable().alter();
    table.string('oauth_id').unique().nullable();
    table.enum('provider', ['local', 'discord', 'google']).defaultTo('local'); 
  });
};

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', table => {
    table.string('password').notNullable().alter();
    table.dropColumn('oauth_id');
    table.dropColumn('provider');
  });
};
