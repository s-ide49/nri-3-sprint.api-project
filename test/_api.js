/* eslint-disable prettier/prettier */
const { setupExpressServer } = require("../src/server");
// We know about chai...
const chai = require("chai");
// ...with chai-http we can add matchers for making http requests!
const chaiHttp = require("chai-http");
const { expect, assert } = require("chai");
// ... we need to tell chai to use chaiHttp though. It is a middleware
const config = require("../knexfile");
const catModel = require("../src/cat/cat.model");
const knex = require("knex")(config);
chai.use(chaiHttp);
// this enables us to use .should assertions instead of expecct. Personal Preference
chai.should();

// Another reason we separated creating our server from starting it
const app = setupExpressServer();

describe("The express server", () => {
  let request;
  beforeEach(async () => {
    request = chai.request(app);
    await knex.seed.run();
  });

  describe("GET /cat ", () => {
    it("should return all cat", async () => {
      const res = await request.get("/cat");
      JSON.parse(res.text).length.should.equal(5);
    });

    it("should return cat of id=1", async () => {
      const res = await request.get("/cat/1");
      JSON.parse(res.text)["id"].should.be.equal(1);
    });
  });

  // describe("POST /cat ", () => {
  //   it("should return add cat", async () => {
  //     const expected = await {
  //       name: "test",
  //       feature: "test",
  //     };
  //     const res = await request.post("/cat").send(expected);
  //     res.should.have.status(200);
  //   });
  // });

  // describe("DELETE /cat ", () => {
  //   it("should return delete cat", async () => {
  //     const res = await request.delete("/cat/1");
  //     console.log(res)
  //     res.should.have.status(200);
  //   });
  // });

  // describe("POST /cat/2 ", () => {
  //   it("should return edit cat", async () => {
  //     const expected = await {
  //       name: "edittitle",
  //       feature: "editdesp",
  //     };
  //     const res = await request.patch("/cat/2").send(expected);
  //     res.should.have.status(200);
  //   });
  // });
});
