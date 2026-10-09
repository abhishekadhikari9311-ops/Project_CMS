const { comments, users, blogs } = require("../../model/connection");

exports.setBlogId = async (req, res) => {
  req.session.blogId = req.params.blogId;

  res.redirect("/comment/add-comment");
};

exports.getComment = async (req, res) => {
  const { blogId } = req.session;
  res.render("addComment", {
    blogId,
  });
};

exports.handlePostComment = async (req, res) => {
  const { CommentMessage } = req.body;

  const { userId } = req;

  const { blogId } = req.params;

  if (!userId) {
    return res.redirect("/user/login");
  }

  const userData = await users.findByPk(userId);

  if (!userData) {
    return res
      .status(400)
      .send("user with that user id does not exists..........");
  }

  await comments.create({
    CommentMessage,
    userId: userData.id,
    blogId,
  });

  return res.redirect("/comment/read-comment/" + blogId);
};

exports.readCommentAll = async (req, res) => {
  const { blogId } = req.params;
  const { userId } = req;
  const fetchAllComment = await comments.findAll({
    where: {
      blogId,
      userId,
    },

    include: {
      model: blogs,
      model: users,
    },
  });

  console.log(fetchAllComment, "fetch all comments");

  return res.render("readComment", {
    fetchAllComment,
    blogId,
  });
};
