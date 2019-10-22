const supertest = require("supertest");
const server = require("../api/server");

describe("GET / owners model", () => {
  it("should return a 200 if a user logged in session is present", async () => {
    let logIn = await supertest(server)
      .post("/api/login")
      .send({
        username: "elonmusk",
        password: "space"
      });
    let response = await supertest(server)
      .get("/api/owners")
      .set("Authorization", logIn.body.token);
    expect(response.status).toBe(200);
  });
});
