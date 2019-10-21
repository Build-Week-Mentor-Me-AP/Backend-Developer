exports.up = function(knex) {
  return knex.schema
    .createTable("entrepreneurs", ent => {
      ent.string("username", 128).primary();
      ent.string("name", 128).notNullable();
      ent
        .text("bio", 238)
        .notNullable()
        .defaultTo("[Empty bio]");
      ent
        .string("avatar")
        .notNullable()
        .defaultTo(
          "https://www.nhlbi.nih.gov/sites/default/files/styles/square_crop/public/2017-12/genericavatar_64.png?itok=B07OtsV0"
        );
      ent
        .string("password", 18)
        .notNullable()
        .defaultTo("");
    })
    .createTable("business_owners", bus => {
      bus.string("username", 128).primary();
      bus.string("name").notNullable();
      bus
        .text("bio", 238)
        .notNullable()
        .defaultTo("[Empty bio]");
      bus
        .string("avatar")
        .notNullable()
        .defaultTo(
          "https://www.nhlbi.nih.gov/sites/default/files/styles/square_crop/public/2017-12/genericavatar_64.png?itok=B07OtsV0"
        );
      bus
        .string("password", 18)
        .notNullable()
        .defaultTo("");
    })
    .createTable("questions", qs => {
      qs.increments();
      qs.string("title").notNullable();
      qs.text("question")
        .notNullable()
        .defaultTo("TBD");
      qs.string("business_type").notNullable();
      qs.string("photo")
        .notNullable()
        .defaultTo("");
      qs.string("entrepreneur_username")
        .unsigned()
        .notNullable()
        .references("username")
        .inTable("entrepreneurs")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("answers", answ => {
      answ.increments();
      answ.text("answer").notNullable();
      answ
        .integer("question_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("questions")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      answ
        .string("bus_owner_username")
        .unsigned()
        .notNullable()
        .references("username")
        .inTable("business_owners")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("answers")
    .dropTableIfExists("questions")
    .dropTableIfExists("business_owners")
    .dropTableIfExists("entrepreneurs");
};
