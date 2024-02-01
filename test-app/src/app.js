const express = require("express");
const logger = require("morgan");

const app = express();

app.use(express.json());
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.status(200).send("ok");
});

module.exports = app;
