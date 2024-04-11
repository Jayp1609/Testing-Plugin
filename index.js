// server.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Sample comments data
let comments = [
  {
    id: 1,
    postId: 1,
    text: "This is a great post!",
    author: "John Doe",
    date: "2024-04-11",
  },
  {
    id: 2,
    postId: 1,
    text: "Nice job!",
    author: "Jane Smith",
    date: "2024-04-11",
  },
];

app.use(bodyParser.json());

// Endpoint to fetch comments for a blog post
app.get("/api/comments", (req, res) => {
  const postComments = comments;
  res.json(postComments);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
