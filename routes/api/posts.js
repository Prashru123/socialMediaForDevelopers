const express = require('express');
const router = express.Router();
const User = require('../../modals/User');
const Profile = require('../../modals/Profile');
const Post = require('../../modals/Post');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

//@desc    create a post
//@req    POST /api/posts
//access  Private
router.post(
  '/',
  [auth, [check('text', 'please add a comment').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  }
);
// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

//@desc   Get all post
//@req    GET /api/posts
//access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

//@desc   Get Post by id
//@req    GET /api/posts/post_id
//access  private
router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: 'No post found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

//@desc   Update Post by likes
//@req    Update /api/posts/like/:post_id
//access  Public
router.put('/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'This post is alredy liked by you' });
    }

    post.likes.push({ user: req.user.id });
    await post.save();
    res.status(200).json(post.likes);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

//@desc   Dislike the post
//@req    UPDATE /api/posts/post_id
//access  Public
router.put('/unlike/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (
      post.likes.length !== 0 &&
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    const updatePostLike = post.likes.filter(
      (like) => like.user.toString() !== req.user.id
    );
    post.likes = updatePostLike;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});
//@desc   Update Post by comment
//@req    Update /api/posts/comment/:post_id
//access  Public
router.put(
  '/comment/:post_id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const post = await Post.findById(req.params.post_id);
      const user = await User.findById(req.user.id).select('-password');

      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };
      post.comments.unshift(newComment);
      post.save();

      res.status(200).json(post.comments);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  }
);

//@desc   Delete Post by comment
//@req    DELETE /api/posts/comment/:post_id/:comment_id
//access  Public
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    //pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    //Make sure comment exist

    if (!comment) {
      return res.status(404).json({ msg: 'No comments found' });
    }

    //check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    post.comments = post.comments.filter(
      (comment) => comment.id !== req.params.comment_id
    );
    comment;

    await post.save();
    res.status(200).json(post.comments);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});
module.exports = router;
