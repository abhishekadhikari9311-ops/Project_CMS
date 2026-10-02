const express = require("express");
const app = express();

app.set("view engine", "ejs");

const PORT = 5000;

// home page

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});