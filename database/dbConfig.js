const knex = require("knex");
const configOptions = require("../knexfile").development;
const db = knex(configOptions);

module.exports = {
  findEntrepreneurs,
  findOwners,
  findQuestions,
  findAnswers,
  findQuestionsById,
  findAnswersOnQuestions,
  findId,
  registerEntrepreneur,
  registerOwner,
  login,
  update,
  remove,
  matchEnt,
  matchOwn,
  removeOwn
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

function matchEnt(str) {
  return db("entrepreneurs").where({ username: str });
}

function matchOwn(str) {
  return db("business_owners").where({ username: str });
}

function findId(str) {
  return db("users")
    .where({ username: str.toString() })
    .select("users.id")
    .first();
}

function findTasks(id) {
  return db("tasks")
    .join("projects", "tasks.project_id", "=", "projects.id")
    .where({ project_id: id })
    .select(
      "tasks.id",
      "tasks.description",
      "tasks.notes",
      "tasks.completed",
      "projects.name as project_name",
      "projects.description as project_description"
    )
    .then(tasks => {
      return tasks.map(task => {
        return { ...task, completed: Boolean(task.completed) };
      });
    });
}

function findAnswersOnQuestions(questionID) {
  console.log(questionID);
  return db("answers").where({ question_id: questionID });
}

function findQuestionsById(questionID) {
  console.log(questionID);
  return db("questions").where({ id: questionID });
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

function removeOwn(str) {
  return db("business_owners")
    .where("username", String(str))
    .del();
}
