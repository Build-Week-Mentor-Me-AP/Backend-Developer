const knex = require("knex");
const configOptions = require("../knexfile").development;
const db = knex(configOptions);

module.exports = {
  findEntrepreneurs,
  findOwners,
  findQuestions,
  findAnswers,
  findBy,
  findId,
  registerEntrepreneur,
  registerOwner,
  login,
  update,
  remove
};

function findEntrepreneurs() {
  return db("entrepreneurs");
}

function findOwners() {
  return db("business_owners");
}

function findQuestions() {
  return db("questions");
}

function findAnswers() {
  return db("answers");
}

function findBy(str) {
  let entrepreneurs = db("entrepreneurs").where({ username: str });
  let owners = db("business_owners").where({ username: str });
}

function findId(str) {
  return db("users")
    .where({ username: str.toString() })
    .select("users.id")
    .first();
}

function registerEntrepreneur(resource) {
  return db("entrepreneurs").insert(resource);
}

function registerOwner(resource) {
  return db("business_owners").insert(resource);
}

function login(resource) {
  return db("users")
    .insert(resource)
    .then(ids => ({ id: ids[0] }));
}

function update(id, resource) {
  return db("users")
    .where("id", Number(id))
    .update(resource);
}
function remove(id) {
  return db("users")
    .where("id", Number(id))
    .del();
}
