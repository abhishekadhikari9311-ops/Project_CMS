exports.postAddBlog = async (req, res) => {
  const { TitleName, SubTitleName, DescriptionName } = req.body;

  console.log("image inserted:----", req.file);

  console.log(TitleName, SubTitleName, DescriptionName);

  if (!TitleName || !SubTitleName || !DescriptionName) {
    console.log("please provide all the given required details.....");
    return res.send("hello");
  }

  await blogs.create({
    TitleName,
    SubTitleName,
    DescriptionName,
    image: "http://localhost:5000/" + req.file.filename,
  });

  return res.redirect("/");
};

exports.postEditBlog = async (req, res) => {
  const { id } = req.params;

  const { TitleName, SubTitleName, DescriptionName } = req.body;

  const editBlog = await blogs.update(
    {
      TitleName,
      SubTitleName,
      DescriptionName,
    },
    {
      where: {
        id,
      },
    },
  );
  res.redirect("/");
};

exports.getEditBlog = async (req, res) => {
  const { id } = req.params;

  const blog = await blogs.findByPk(id);

  res.render("editBlog", {
    id,
    blog,
  });
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  await blogs.destroy({
    where: { id },
  });

  res.redirect("/");
};

exports.getSingleBlog = async (req, res) => {
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
};

exports.getAddBlog = (req, res) => {
  const user = {
    userName: "Abhishek Adhikari",
  };
  res.render("addBlog", { user });
};
