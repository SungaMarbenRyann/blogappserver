const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.addComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const post = await Post.findById(postId);
    if(!post) return res.status(404).json({ message: 'Post not found' });
    const comment = new Comment({ content, post: postId, author: req.user._id });
    await comment.save();
    res.json(comment);
  } catch(err) { res.status(500).json({ message: err.message }); }
};

exports.getCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username').sort({ createdAt: -1 });
    res.json(comments);
  } catch(err) { res.status(500).json({ message: err.message }); }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if(!comment) return res.status(404).json({ message: 'Comment not found' });
    // only author or admin can delete
    if(comment.author.toString() !== req.user._id.toString() && !req.user.isAdmin) return res.status(403).json({ message: 'Not authorized' });
    await comment.remove();
    res.json({ message: 'Comment deleted' });
  } catch(err) { res.status(500).json({ message: err.message }); }
};
