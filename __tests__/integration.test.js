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
      .then(({ body }) => {
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

describe("GET /api/articles/:article_id", () => {
  test("responds with a 200 status code", () => {
    return request(app).get("/api/articles/1").expect(200);
  });
  test("200: responds with an article object, with all of the correct properties", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        body.article.forEach((property) => {
          expect(property.article_id).toBe(1);
          expect(typeof property.title).toBe("string");
          expect(typeof property.topic).toBe("string");
          expect(typeof property.author).toBe("string");
          expect(typeof property.body).toBe("string");
          expect(typeof property.created_at).toBe("string");
          expect(typeof property.votes).toBe("number");
          expect(typeof property.article_img_url).toBe("string");
        });
      });
  });
  test("GET 400: invalid article_id input", () => {
    return request(app)
      .get("/api/articles/not-an-id")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
  test("GET 404: not found, article_id does not exist in table", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("that ID does not exist");
      });
  });
});

describe("GET /api/articles", () => {
  test("responds with a 200 status code", () => {
    return request(app).get("/api/articles").expect(200);
  });
  test("200: responds with an articles array of objects with the correct properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        body.articles.forEach((property) => {
          expect(typeof property.article_id).toBe("number");
          expect(typeof property.title).toBe("string");
          expect(typeof property.topic).toBe("string");
          expect(typeof property.author).toBe("string");
          expect(typeof property.created_at).toBe("string");
          expect(typeof property.votes).toBe("number");
          expect(typeof property.article_img_url).toBe("string");
          expect(typeof property.comment_count).toBe("string");
        });
      });
  });
  test("200: should respond with an array of articles without a body property present on any of the objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        body.articles.forEach((property) => {
          expect(property.body).toBeUndefined();
        });
      });
  });
  test.todo(
    "200: should return an array of objects in descending order based on created_at unix code"
  );
});

// Any pointers on what else I can test for here? Also, how can I test that these are sorted by descending order when the value is in a strange format, i.e. "2020-11-03T09:12:00.000Z"

// It seems very convoluted to me to have to convert each one to a date to be able to compare with the next by order. Is there something simple I'm missing?

// Also, should comment_count be incrementing? What is a comment defined as? A little confused there. I'm assuming 1 body = 1 comment.
