const catController = require("./cat/cat.controller");
// const path = require("path");
const express = require("express");
const morgan = require("morgan");

const setupExpressServer = () => {
  const app = express();
  app.use(express.json());
  app.use(morgan("combined"));
  app.set("views", `${__dirname}/`);
  app.set("view engine", "ejs");

  app.get("/", (req, res) => {
    res.render("pages/index");
  });
  app.get("/cat", catController.index);
  app.get("/cat/:id", catController.listById);
  app.get("/test", catController.test);

  app.post("/cat/", catController.add);
  app.delete("/cat/:id", catController.remove);
  app.patch("/cat/:id", catController.update);

  return app;
};

module.exports = { setupExpressServer };
