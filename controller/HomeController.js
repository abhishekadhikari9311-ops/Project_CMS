const { blogs } = require("../model/connection");

exports.renderHome = async (req, res) => {
  try {
    const fetchBlog = await blogs.findAll();

    console.log("fetch all blogs:-------->", fetchBlog);

    res.render("home", { fetchBlog });
  } catch (err) {
    console.log("error:---", err);
    res.status(500).send("Error fetching blogs");
  }
};

