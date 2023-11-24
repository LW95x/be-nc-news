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

describe("POST /api/articles/:article_id/comments", () => {
  test("POST 201: should add a comment to an existing article", () => {
    const newComment = {
      username: "butter_bridge",
      body: "this is a test comment",
    };

    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then((response) => {
        expect(response.body.author).toBe("butter_bridge");
        expect(response.body.body).toBe("this is a test comment");
        expect(response.body.article_id).toBe(1);
        expect(response.body.votes).toBe(0);
      });
  });
  test("POST 400: invalid article_id input", () => {
    const newComment = {
      username: "butter_bridge",
      body: "this is a test comment",
    };

    return request(app)
      .post("/api/articles/not_an_id/comments")
      .send(newComment)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
  test("POST 404: not found, article_id does not exist in the table", () => {
    const newComment = {
      username: "butter_bridge",
      body: "this is a test comment",
    };

    return request(app)
      .post("/api/articles/9999/comments")
      .send(newComment)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("that ID does not exist");
      });
  });
  test("POST 400: username does not exist", () => {
    const newComment = {
      username: "liam",
      body: "this is a test comment",
    };

    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
  test("POST 201: should only post with the correct properties when foreign properties are added", () => {
    const newComment = {
      username: "butter_bridge",
      body: "this is a test comment",
      extra_property: "banana",
    };

    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then((response) => {
        expect(response.body.author).toBe("butter_bridge");
        expect(response.body.body).toBe("this is a test comment");
        expect(response.body.extra_property).toBeUndefined();
      });
  });
  test("POST 400: Incomplete request body", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ username: "butter_bridge" })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("PATCH 200: should update vote quantity when object is passed in", () => {
    return request(app)
      .patch("/api/articles/1/")
      .send({ inc_votes: 5 })
      .expect(200)
      .then((response) => {
        expect(response.body.article_id).toBe(1);
        expect(response.body.votes).toBe(105);
      });
  });
  test("PATCH 200: should update vote quantity with negative votes by decrementing", () => {
    return request(app)
      .patch("/api/articles/1/")
      .send({ inc_votes: -5 })
      .expect(200)
      .then((response) => {
        expect(response.body.article_id).toBe(1);
        expect(response.body.votes).toBe(95);
      });
  });
  test("PATCH 400: invalid patch object input", () => {
    return request(app)
      .patch("/api/articles/1/")
      .send({ fake_votes: "not a number" })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
  test("PATCH 404: not found, article_id does not exist in table", () => {
    return request(app)
      .patch("/api/articles/9999")
      .send({ inc_votes: 5 })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("that article ID does not exist");
      });
  });
  test("PATCH 400: invalid article_id input", () => {
    return request(app)
      .patch("/api/articles/not_an_id")
      .send({ inc_votes: 5 })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("DELETE 204: should remove comments by comment_id", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then(() => {
        return db.query(`SELECT * FROM comments`).then(({ rows }) => {
          rows.forEach((comment) => {
            expect(comment.comment_id).not.toBe(1);
          });
        });
      });
  });
  test("DELETE 400: invalid comment_id input", () => {
    return request(app)
      .delete("/api/comments/not-an-id")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
  test("DELETE 404:not found, comment_id does not exist in the table", () => {
    return request(app)
      .delete("/api/comments/9999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("that comment ID does not exist");
      });
  });
});

describe("GET /api/users", () => {
  test("GET 200: returns an array of user objects with the correct properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users.length).toBe(4);
        body.users.forEach((user) => {
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        });
      });
  });
});
