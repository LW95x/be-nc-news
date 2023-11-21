const express = require("express");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
require("jest-sorted");
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
  test("GET 200: returns an array of topic objects with 'slug' and 'description' properties", () => {
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
  test("GET 200: should return a JSON object with description, queries, and exampleResponse", () => {
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
  test("200: responds with an articles array of objects with the correct properties sorted in descending order with a comment_count", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(13);
        expect(body.articles).toBeSorted({
          descending: true,
          key: "created_at",
        });
        body.articles.forEach((property) => {
          expect(typeof property.article_id).toBe("number");
          expect(typeof property.title).toBe("string");
          expect(typeof property.topic).toBe("string");
          expect(typeof property.author).toBe("string");
          expect(typeof property.created_at).toBe("string");
          expect(typeof property.votes).toBe("number");
          expect(typeof property.article_img_url).toBe("string");
          expect(typeof property.comment_count).toBe("string");
          expect(property.body).toBeUndefined();
        });
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: responds with an array of comments with the correct article_id sorted in descending order", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments.length).toBe(11);
        expect(body.comments).toBeSorted({
          descending: true,
          key: "created_at",
        });
        body.comments.forEach((property) => {
          expect(typeof property.comment_id).toBe("number");
          expect(typeof property.votes).toBe("number");
          expect(typeof property.created_at).toBe("string");
          expect(typeof property.author).toBe("string");
          expect(typeof property.body).toBe("string");
          expect(property.article_id).toBe(1);
        });
      });
  });
  test("GET 400: invalid article_id input", () => {
    return request(app)
      .get("/api/articles/not_an_id/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
  test("GET 404: not found, article_id does not exist in table", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("that ID does not exist");
      });
  });
});
