const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addComment, getCommentsForPost, deleteComment } = require('../controllers/comments');

router.get('/post/:postId', getCommentsForPost);
router.post('/', auth, addComment);
router.delete('/:id', auth, deleteComment);

module.exports = router;
