// USING JEST FRAMEWORK TO CONDUCT UNIT TESTS
const request = require("supertest");
const app = require("../../app");

// Group related tests together
describe("Testing GET / endpoints", () => {
  test("It should get All planets data", async () => {
    const response = await request(app).get("/planets");
    expect(response.body).toBeDefined();
    expect(response.statusCode).toBe(200);
  });
});
