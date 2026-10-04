const express = require("express");
const { users, blogs } = require("./model/connection");
const userModel = require("./model/userModel");
const { where } = require("sequelize");
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

// app.get("/", (req, res) => {
//   res.render("home");
// });

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

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/post-register", async (req, res) => {
  const {
    UserName,
    UserEmail,
    UserPassword,
    UserPhoneNumber,
    ConfirmUserPassword,
  } = req.body;

  if (
    !UserName ||
    !UserEmail ||
    !UserPassword ||
    !ConfirmUserPassword ||
    !UserPhoneNumber
  ) {
    return res.status(400).send("please provide complete details");
  }

  // Check password confirmation
  if (UserPassword !== ConfirmUserPassword) {
    return res.status(400).send("Passwords do not match");
  }

  await users.create({
    UserName,
    UserEmail,
    UserPassword,
    UserPhoneNumber,
  });

  return res.status(200).redirect("/");
});

app.get("/users", async (req, res) => {
  const fetchUsers = await users.findAll();
  console.log("fetch all the users:---", fetchUsers);

  res.render("users", { fetchUsers });
});

app.get("/", async (req, res) => {
  try {
    const fetchBlog = await blogs.findAll();

    console.log("fetch all blogs:-------->", fetchBlog);

    res.render("home", { fetchBlog });
  } catch (err) {
    console.log("error:---", err);
    res.status(500).send("Error fetching blogs");
  }
});

app.get("/:id", async (req, res) => {
  try {
    const blogId = req.params.id;

    console.log("ID:", blogId);

    const singleBlog = await blogs.findByPk(blogId);

    console.log("single blog fetching:", singleBlog);

    if (!singleBlog) {
      return res.status(404).send("Blog not found");
    }

    res.render("singleBlog", {
      blog: singleBlog,
    });
  } catch (err) {
    console.error("error", err);
    res.status(500).send("single error fetching");
  }
});

app.get("/delete/:id", async (req, res) => {
  const { id } = req.params;

  await blogs.destroy({
    where: { id },
  });

  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
