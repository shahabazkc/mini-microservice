const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//posts array
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
})

app.post("/posts/:id/comments",async (req, res) => {

  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  await axios.post('http://event-bus-srv:4005/events', {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      PostId: req.params.id
    }
  })

  res.status(201).send(comments);
})

app.post('/events',(req,res)=>{
  console.log("Recieved Event ",req.body.type);
  res.send({})
});

app.listen(4001, () => {
  console.log("listening on port 4001");
})