// server.js
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

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
app.use(cors());
app.use(bodyParser.json());

app.get('/api/comments-script', (req, res) => {
  const script = `
    <script>
      function fetchComments() {
        fetch('/api/comments')
          .then(handleResponse)
          .then(renderComments)
          .catch(handleError);
      }

      function handleResponse(response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }

      function renderComments(comments) {
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML = '';

        comments.forEach(comment => {
          const commentElement = document.createElement('div');
          commentElement.innerHTML = \`
            <p><strong>\${comment.author}</strong>: \${comment.text}</p>
            <p>Posted on \${comment.date}</p>
          \`;
          commentsContainer.appendChild(commentElement);
        });
      }

      function handleError(error) {
        console.error('Error fetching comments:', error);
      }

      fetchComments();
    </script>
  `;
  res.send(script);
});

// Endpoint to fetch comments for a blog post
app.get("/api/comments", (req, res) => {
  const postComments = comments;
  res.json(postComments);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
