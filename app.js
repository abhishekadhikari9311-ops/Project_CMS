const express = require("express");
const { multer, storage } = require("./middleware/multerConfig");
const { renderHome } = require("./controller/HomeController");
const {
  postEditBlog,
  getEditBlog,
  deleteBlog,
  getSingleBlog,
  postAddBlog,
  getAddBlog,
} = require("./controller/blogController");
const {
  getRegisterPage,
  postRegisterPage,
  getUsers,
} = require("./controller/userController");
const app = express();

require("./model/connection");

app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(express.static("./uploads/"));

app.use(express.static(__dirname + "/public/"));

const upload = multer({ storage });

const PORT = 5000;

app.get("/addblog", getAddBlog);

app.post("/addblog", upload.single("image"), postAddBlog);

app.get("/get-register", getRegisterPage);

app.post("/post-register", postRegisterPage);

app.get("/get-users", getUsers);

app.get("/", renderHome);

app.get("/:id", getSingleBlog);

app.get("/delete/:id", deleteBlog);

app.get("/edit/:id", getEditBlog);

app.post("/edit/:id", postEditBlog);

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});