

const express = require("express");
const app = express();

require("./model/connection");

app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.use(express.static("./uploads"));
app.use(express.static(__dirname + "/public"));

const PORT = 5000;

const blogRoute = require("./routes/blog/blogRoute");
const userRoute = require("./routes/user/userRoute");

app.use("/blog", blogRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
