const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.deleteAnyPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        await post.deleteOne(); // ✅ instead of post.remove()
        res.json({ message: 'Post deleted by admin' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteAnyComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        await comment.deleteOne(); // ✅ instead of comment.remove()
        res.json({ message: 'Comment deleted by admin' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
