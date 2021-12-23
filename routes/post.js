const router = require("express").Router();

const Post = require("../models/Post");
const checkAuth = require('../middleware/check-auth')

//CREATE POST
router.post("/create",checkAuth,async (req, res) => {
  const post = new Post(req.body);
  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try{
    const deletrecord = await Post.findByIdAndDelete(req.params.id);
    res.send(deletrecord);
  }catch(err){
    res.status(500).send(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  try{
    const showrecords =await Post.find({});
    res.status(201).send(showrecords);
  }catch(err){
      res.staus(400).send(err);
  }
});

module.exports = router;
