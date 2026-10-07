const { blogs } = require("../../model/connection");

exports.postAddBlog = async (req, res) => {
  try {
    const { userId } = req;

    const { TitleName, SubTitleName, DescriptionName } = req.body;

    if (!TitleName || !SubTitleName || !DescriptionName) {
      return res.status(400).send("Please provide all required details.");
    }

    if (!req.file) {
      return res.status(400).send("Please upload an image.");
    }

    const newBlog = await blogs.create({
      TitleName,
      SubTitleName,
      DescriptionName,
      image: "http://localhost:5000/" + req.file.filename,
      userId,
    });

    console.log("Blog created:", newBlog);

    res.redirect("/blog/");
  } catch (err) {
    console.error("POST BLOG ERROR:", err);
    res.status(500).send("Error creating blog");
  }
};

exports.getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Single Blog ID:", id);

    const singleBlog = await blogs.findByPk(id);

    console.log("Single Blog:", singleBlog);

    if (!singleBlog) {
      return res.status(404).send("Blog not found");
    }

    res.render("singleBlog", {
      blog: singleBlog,
    });
  } catch (err) {
    console.error("Error fetching single blog:", err);
    res.status(500).send("Error fetching single blog");
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    await blogs.destroy({
      where: {
        id: id,
      },
    });

    res.redirect("/blog/");
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).send("Error deleting blog");
  }
};

exports.getEditBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await blogs.findByPk(id);

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    res.render("editBlog", {
      blog,
    });
  } catch (err) {
    console.error("Error fetching edit blog:", err);
    res.status(500).send("Error fetching edit blog");
  }
};

exports.postEditBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const { TitleName, SubTitleName, DescriptionName } = req.body;

    const updateData = {
      TitleName,
      SubTitleName,
      DescriptionName,
    };

    console.log("req.file----------->", req.file);

    if (req.file) {
      updateData.image = "http://localhost:5000/" + req.file.filename;
    }

    await blogs.update(updateData, {
      where: {
        id: id,
      },
    });

    res.redirect("/blog/");
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).send("Error updating blog");
  }
};

exports.getAddBlog = (req, res) => {
  const user = {
    userName: "Abhishek Adhikari",
  };

  res.render("addBlog", {
    user,
  });
};
