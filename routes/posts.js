const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createPost, getAll, getOne, updatePost, deletePost } = require('../controllers/posts');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;
