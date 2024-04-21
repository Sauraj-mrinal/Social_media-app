const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 9000;

let posts = [];
let postId = 1;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/posts', (req, res) => {
    const { imageLink, description } = req.body;
    const newPost = {
        id: postId++,
        imageLink,
        description,
        comments: []
    };
    posts.push(newPost);
    res.json(newPost);
});

app.post('/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (!post) return res.status(404).send('Post not found');

    const { comment } = req.body;
    const newComment = { content: comment };
    post.comments.push(newComment);
    res.json(newComment);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
