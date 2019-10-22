const auth = require("./auth-router");
const authMiddleware = require("./authenticate-middleware");
const db = require("../database/dbConfig");
const supertest = require("supertest");
const server = require("../api/server");

describe("POST / login", () => {
  it("should return status 200 if the user successfully logged on", async () => {
    let response = await supertest(server)
      .post("/api/login")
      .send({
        username: "elonmusk",
        password: "space"
      });
    expect(response.status).toBe(200);
  });
  it("should return a generated token in case of successful login", async () => {
    let response = await supertest(server)
      .post("/api/login")
      .send({
        username: "elonmusk",
        password: "space"
      });
    expect(response.body.token).toBeTruthy();
  });
  it("should return 401 unauthorized if the user doesn't exist on the database", async () => {
    let response = await supertest(server)
      .post("/api/auth/login")
      .send({
        username: "username",
        password: "123"
      });
    expect(response.status).toBe(401);
  });
});

describe("POST / register", () => {
  it("should return status 201 if the owner successfully registered", async () => {
    let response = await supertest(server)
      .post("/api/register/owner")
      .send({
        username: "testUser",
        name: "Deck Ree",
        password: "password"
      });
    expect(response.status).toBe(201);
    let id = await db.matchOwn("testUser");
    await db.removeOwn(id.id);
  });
  it("should return 500 if username of entrepreneur is already in the database", async () => {
    let response = await supertest(server)
      .post("/api/register/entrepreneurs")
      .send({
        username: "tardis",
        name: "Adams Mr",
        password: "123456"
      });
    expect(response.status).toBe(500);
  });
});
