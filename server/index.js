require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { PORT } = process.env;
//const PORT = 4000;

const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/posts");

const { login, register } = require("./controllers/auth");

const { isAuthenticated } = require("./middleware/isAuthenticated");

const app = express();

const sequelize = require("../server/util/database");
const Post = require("./models/post");
const User = require("./models/user");

User.hasMany(Post);
Post.belongsTo(User);

app.use(express.json());
app.use(cors());

app.post("/register", register);
app.post("/login", login);
app.get("/posts", getAllPosts);
app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
