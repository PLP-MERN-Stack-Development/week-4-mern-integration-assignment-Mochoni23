const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  uploadPostImage
} = require('../controllers/PostController');
const { protect, authorize } = require('../middleware/authmiddleware');
const advancedResults = require('../middleware/AdvancedResults');
const Post = require('../models/Post');

router
  .route('/')
  .get(advancedResults(Post, {
    path: 'author',
    select: 'name email'
  }), getPosts)
  .post(protect, authorize('user', 'admin'), createPost);

router
  .route('/:id')
  .get(getPost)
  .put(protect, authorize('user', 'admin'), updatePost)
  .delete(protect, authorize('user', 'admin'), deletePost);

router.route('/:id/photo').put(protect, authorize('user', 'admin'), uploadPostImage);

module.exports = router; 