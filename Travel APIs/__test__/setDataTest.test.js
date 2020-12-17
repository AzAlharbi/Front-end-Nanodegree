const req = require("supertest");
const app = require("../src/server/server");
import "babel-polyfill";
describe("Testing the status", () => {
  test("test", async () => {
    try {
      const data = await req(app).get("/test");
      expect(data.statusCode).toEqual(200);
    } catch (error) {
      console.log(error);
    }
  });
});
