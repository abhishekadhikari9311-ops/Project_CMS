// const { blogs } = require("../../model/connection");

// exports.postAddBlog = async (req, res) => {
//   const { TitleName, SubTitleName, DescriptionName } = req.body;

//   console.log("image inserted:----", req.file);

//   console.log(TitleName, SubTitleName, DescriptionName);

//   if (!TitleName || !SubTitleName || !DescriptionName) {
//     console.log("please provide all the given required details.....");
//     return res.send("hello");
//   }

//   await blogs.create({
//     TitleName,
//     SubTitleName,
//     DescriptionName,
//     image: "http://localhost:5000/" + req.file.filename,
//   });

//   return res.redirect("/");
// };

// exports.postEditBlog = async (req, res) => {
//   const { id } = req.params;

//   const { TitleName, SubTitleName, DescriptionName } = req.body;

//   const ImageName = req.file.filename;

//   await blogs.update(
//     {
//       TitleName,
//       SubTitleName,
//       DescriptionName,
//       image: "http://localhost:5000/" + ImageName,
//     },
//     {
//       where: {
//         id,
//       },
//     },
//   );
//   res.redirect("/blog/");
// };

// exports.getEditBlog = async (req, res) => {
//   const { id } = req.params;

//   const blog = await blogs.findByPk(id);

//   res.render("editBlog", {
//     id,
//     blog,
//   });
// };

// exports.deleteBlog = async (req, res) => {
//   const { id } = req.params;

//   await blogs.destroy({
//     where: { id },
//   });

//   res.redirect("/");
// };

// exports.getSingleBlog = async (req, res) => {
//   try {
//     const blogId = req.params.id;

//     console.log("ID:", blogId);

//     const singleBlog = await blogs.findByPk(blogId);

//     console.log("single blog fetching:", singleBlog);

//     if (!singleBlog) {
//       return res.status(404).send("Blog not found");
//     }

//     res.render("singleBlog", {
//       blog: singleBlog,
//     });
//   } catch (err) {
//     console.error("error", err);
//     res.status(500).send("single error fetching");
//   }
// };

// exports.getAddBlog = (req, res) => {
//   const user = {
//     userName: "Abhishek Adhikari",
//   };
//   res.render("addBlog", { user });
// };

const { blogs } = require("../../model/connection");

exports.postAddBlog = async (req, res) => {
  try {
    const { TitleName, SubTitleName, DescriptionName } = req.body;

    console.log("Image inserted:", req.file);
    console.log(TitleName, SubTitleName, DescriptionName);

    if (!TitleName || !SubTitleName || !DescriptionName) {
      return res.send("Please provide all the required details.");
    }

    if (!req.file) {
      return res.send("Please upload an image.");
    }

    await blogs.create({
      TitleName,
      SubTitleName,
      DescriptionName,
      image: "http://localhost:5000/" + req.file.filename,
    });

    res.redirect("/blog/");
  } catch (err) {
    console.error("Error while creating blog:", err);
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
