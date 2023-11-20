const express = require("express");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const {
  articleData,
  commentData,
  topicData,
  userData,
} = require("../db/data/test-data/index.js");
const app = require("../db/app");

beforeEach(() => {
  return seed({ articleData, commentData, topicData, userData });
});

afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("responds with a 200 status code", () => {
    return request(app).get("/api/topics").expect(200);
  });
  test("returns an array of topic objects with 'slug' and 'description' properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics.length).toBe(3); 
        body.topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
});

describe("GET /api", () => {
  test("responds with a 200 status code", () => {
    return request(app).get("/api").expect(200);
  });
  test("should return a JSON object with description, queries, and exampleResponse", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({body}) => {
        expect(body).toMatchObject({
          "GET /api/topics": {
            description: "serves an array of objects of all topics",
            queries: [],
            exampleResponse: {
              topics: [{ slug: "football", description: "Footie!" }],
            },
          },
        });
      });
  });
});
