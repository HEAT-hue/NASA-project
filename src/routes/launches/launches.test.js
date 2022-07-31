/* UNIT TESTING WITH JEST FRAMEWORK*/

// Supertest allows us to make real requests to our APIs
const request = require("supertest");
const app = require("../../app.js");

// Describe, to group related tests
describe("Test GET /launch", () => {
  // test() - this is where we define individul tests
  test("it should respond with 200 status code", async () => {
    // Supertest calls app listen function to make request
    const response = await request(app).get("/launches");
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.statusCode).toBe(200);
  });
});

describe("Test POST / API", () => {
  const launchdataWithoutDate = {
    mission: "UX Explore",
    rocket: "ZTM X-APP",
    target: "Earth",
  };

  const launchdataWithIncorrectDate = {
    mission: "UX Explore",
    rocket: "ZTM X-APP",
    target: "Earth",
    launchDate: "Onyejeme Emmanuel",
  };

  const launchDataWithDate = {
    mission: "UX Explore",
    rocket: "ZTM X-APP",
    target: "Earth",
    launchDate: "July 17, 2030",
  };

  test("it should respond with 200 status code", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithDate);
    expect(response.statusCode).toBe(201);
  });

  test("It should catch missing required parameters", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchdataWithoutDate);
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ error: "Missing launch property" });
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchdataWithIncorrectDate);
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({ error: "Incorrect Date property" });
  });
});
