const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex("business_owners")
    .truncate()
    .then(() => {
      return knex("business_owners").insert([
        {
          username: "elonmusk",
          name: "Elon Musk",
          bio: "Tesla is quite cool, isn't it?",
          password: bcrypt.hashSync("space"),
          avatar:
            "https://www.biography.com/.image/t_share/MTY2MzU3Nzk2OTM2MjMwNTkx/elon_musk_royal_society.jpg"
        },
        {
          username: "zuckk",
          name: "Mark Zuckerberg",
          password: bcrypt.hashSync("plaintext"),
          bio: "The secret to making money is to run ads!",
          avatar:
            "https://timedotcom.files.wordpress.com/2018/07/mark-zuckerberg-holocaust.jpg"
        }
      ]);
    });
};
