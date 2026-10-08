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
const { isAuthenticated } = require("../../middleware/isAuthenticated");

const upload = multer({ storage });

const router = express.Router();

// Home page
router.get("/", isAuthenticated, renderHome);

// Add blog
router
  .route("/addblog")
  .get(getAddBlog)
  .post(upload.single("image"), isAuthenticated, postAddBlog);

// Single blog
router.get("/:id", isAuthenticated, getSingleBlog);

// Delete blog
router.route("/delete/:id").get(isAuthenticated, deleteBlog);

// Edit blog
router
  .route("/edit/:id")
  .get(getEditBlog)
  .post(isAuthenticated, upload.single("image"), postEditBlog);

module.exports = router;
