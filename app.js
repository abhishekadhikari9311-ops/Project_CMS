const express = require("express");
const { blogs, Blogs } = require("./model/connection");
const app = express();

require("./model/connection");

app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

const PORT = 5000;

// home page

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/addblog", (req, res) => {
  const user = {
    userName: "Abhishek Adhikari",
  };
  res.render("addBlog", { user });
});

app.post("/addblog", async (req, res) => {
  const { TitleName, SubTitleName, DescriptionName } = req.body;

  console.log(TitleName, SubTitleName, DescriptionName);

  if (!TitleName || !SubTitleName || !DescriptionName) {
    console.log("please provide all the given required details.....");
    return res.send("hello");
  }

  await blogs.create({
    TitleName,
    SubTitleName,
    DescriptionName,
  });

  return res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
