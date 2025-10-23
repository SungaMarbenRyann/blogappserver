const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { deleteAnyPost, deleteAnyComment } = require('../controllers/admin');

router.delete('/posts/:id', auth, admin, deleteAnyPost);
router.delete('/comments/:id', auth, admin, deleteAnyComment);

module.exports = router;
