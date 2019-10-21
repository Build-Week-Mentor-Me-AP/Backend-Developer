exports.seed = function(knex) {
  return knex("questions")
    .truncate()
    .then(() => {
      return knex("questions").insert([
        {
          title: "How to invest in stocks?",
          question:
            "There are so many tremendous companies out there that I don't even know which ones are worthy. Any advice from the founders?",
          business_type: "investing",
          entrepreneur_username: "tardis"
        },
        {
          title: "What is the current value of Facebook?",
          question:
            "No one seems to be using Facebook except for old people and far relatives. Question is when will React, React Native and GraphWl form its own company and separate from Facebook. Those technologies deserve better!",
          business_type: "ownership",
          entrepreneur_username: "oswin"
        }
      ]);
    });
};
