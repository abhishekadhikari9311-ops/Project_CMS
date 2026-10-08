const { blogs, users } = require("../model/connection");

exports.renderHome = async (req, res) => {
  try {
    const fetchBlog = await blogs.findAll({
      include: {
        model: users,
      },
    });

    console.log("All blogs:", fetchBlog);

    res.render("home", {
      fetchBlog,
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).send("Error fetching blogs");
  }
};
