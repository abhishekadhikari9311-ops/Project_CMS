const {
  getComment,
  handlePostComment,
  readCommentAll,
  setBlogId,
  deleteComment,
} = require("../../controller/comment/commentController");
const { isAuthenticated } = require("../../middleware/isAuthenticated");

const router = require("express").Router();

router.route("/set-blog/:blogId").get(isAuthenticated, setBlogId);

router.route("/add-comment").get(isAuthenticated, getComment);

router.route("/add-comment/:blogId").post(isAuthenticated, handlePostComment);

router.route("/read-comment/:blogId").get(isAuthenticated, readCommentAll);

router.route("/delete-comment/:id").get(isAuthenticated, deleteComment);

module.exports = router;
