const Post = require("../models/post");
const User = require("../models/user");

const getAllPosts = async (req, res) => {
  console.log("getAllPosts - server/controller/posts");
  try {
    const posts = await Post.findAll({
      where: { privateStatus: false },
      include: [
        {
          model: User,
          required: true,
          attributes: [`username`],
        },
      ],
    });
    res.status(200).send(posts);
  } catch (error) {
    console.log("ERROR IN getAllPosts");
    console.log(error);
    res.sendStatus(400);
  }
};

const getCurrentUserPosts = async (req, res) => {
  console.log("getCurrentUserPosts");

  try {
    const { userId } = req.params;
    const posts = await Post.findAll({
      where: { userId: userId },
      include: [
        {
          model: User,
          required: true,
          attributes: [`username`],
        },
      ],
    });
    res.status(200).send(posts);
  } catch (error) {
    console.log("ERROR IN getAllPosts");
    console.log(error);
    res.sendStatus(400);
  }
};

const addPost = async (req, res) => {
  console.log("addPost - server/controllers/post");
  try {
    const { title, content, status, userId } = req.body;

    await Post.create({ title, content, privateStatus: status, userId });
    res.status(200).send("Post Created");
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const editPost = async (req, res) => {
  console.log("editPost");

  try {
    const { status } = req.body;
    const { id } = req.params;

    await Post.update({ privateStatus: status }, { where: { id: +id } });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const deletePost = async (req, res) => {
  console.log("deletePost");

  try {
    const { id } = req.params;
    await Post.destroy({ where: { id: +id } });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
};
