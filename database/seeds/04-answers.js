exports.seed = function(knex) {
  return knex("answers")
    .truncate()
    .then(() => {
      return knex("answers").insert([
        {
          answer:
            "You download the Robinhood app and then follow given instructions. Hope that helps!",
          question_id: 1,
          bus_owner_id: 1
        },
        {
          answer:
            "Message me on Twitter DM if you want to know more than what Elon mentioned ;)",
          question_id: 1,
          bus_owner_id: 2
        },
        {
          answer:
            "Those tech teams are my children, they're never leaving me hssss",
          question_id: 2,
          bus_owner_id: 2
        }
      ]);
    });
};
