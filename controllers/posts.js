const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({ title, content, author: req.user._id });
    await post.save();
    res.json(post);
  } catch(err) { res.status(500).json({ message: err.message }); }
};

exports.getAll = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username email').sort({ createdAt: -1 });
    res.json(posts);
  } catch(err) { res.status(500).json({ message: err.message }); }
};

exports.getOne = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username email');
    if(!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch(err) { res.status(500).json({ message: err.message }); }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ message: 'Post not found' });
    if(post.author.toString() !== req.user._id.toString() && !req.user.isAdmin) return res.status(403).json({ message: 'Not authorized' });
    post.title = req.body.title ?? post.title;
    post.content = req.body.content ?? post.content;
    await post.save();
    res.json(post);
  } catch(err) { res.status(500).json({ message: err.message }); }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ message: 'Post not found' });
    if(post.author.toString() !== req.user._id.toString() && !req.user.isAdmin) return res.status(403).json({ message: 'Not authorized' });
    await post.deleteOne();
    res.json({ message: 'Deleted' });
  } catch(err) { res.status(500).json({ message: err.message }); }
};
