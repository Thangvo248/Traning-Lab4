import request from "supertest";
import app from "../../app";
import { jest } from "@jest/globals";

jest.useFakeTimers();

describe("Sign", () => {
  it("should create a new post", async () => {
    const res = await request(app).post("/users/signin").send({
      email: "voducthan2g248@gmail.com",
      passwordHash: "03576036201",
    });
    expect(res.statusCode).toEqual(200);
  });
});
describe("Post Endpoints", () => {
  it("should create a new post", async () => {
    const res = await request(app).post("/users/addUser").send({
      email: "voducthan2g248@gmail.com",
      passwordHash: "03576036201",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("post");
  });
});
