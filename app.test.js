const request = require("supertest");
// we also need our app for the correct routes!
const app = require("./app");

describe("GET /pokemon/all ", () => {
  test("Should respond with number of pokemon", async () => {
    const response = await request(app).get("/pokemon/all");
    expect(response.body[0].Number).toEqual(1);
    expect(response.statusCode).toBe(200);
  });
});
