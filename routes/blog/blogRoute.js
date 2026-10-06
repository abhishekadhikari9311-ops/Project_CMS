// const express = require("express");
// const {
//   getAddBlog,
//   postAddBlog,
//   getSingleBlog,
//   deleteBlog,
//   postEditBlog,
//   getEditBlog,
// } = require("../../controller/blog/blogController");
// const multer = require("multer");

// const { storage } = require("../../middleware/multerConfig");
// const { renderHome } = require("../../controller/HomeController");

// const upload = multer({ storage });

// const router = express.Router();

// router
//   .route("/addblog")
//   .get(getAddBlog)
//   .post(upload.single("image"), postAddBlog);

// router.route("/").get(renderHome);

// router.route("/:id").get(getSingleBlog);

// router.route("/delete/:id").get(deleteBlog);

// router
//   .route("/edit/:id")
//   .get(getEditBlog)
//   .post(upload.single("ImageName"), postEditBlog);

// module.exports = router;

const express = require("express");

const {
  getAddBlog,
  postAddBlog,
  getSingleBlog,
  deleteBlog,
  postEditBlog,
  getEditBlog,
} = require("../../controller/blog/blogController");

const multer = require("multer");
const { storage } = require("../../middleware/multerConfig");
const { renderHome } = require("../../controller/HomeController");

const upload = multer({ storage });

const router = express.Router();

// Home page
router.get("/", renderHome);

// Add blog
router
  .route("/addblog")
  .get(getAddBlog)
  .post(upload.single("image"), postAddBlog);

// Single blog
router.get("/:id", getSingleBlog);

// Delete blog
router.get("/delete/:id", deleteBlog);

// Edit blog
router
  .route("/edit/:id")
  .get(getEditBlog)
  .post(upload.single("image"), postEditBlog);

module.exports = router;
