const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const posts = {};

app.get('/posts',(req,res)=>{
  res.send(posts);
});

app.post('/events',(req,res)=>{
  const {type,data} = req.body;
  
  if(type==='PostCreated'){
  
    const {id,title} = data;
  
    posts[id] = {id,title,comments:[]};
  }

  if(type==='CommentCreated'){
    console.log("data ",data);
    const {id,content,PostId} = data;
  
    const post = posts[PostId];
    post?.comments.push({id,content});

  }
  console.log(posts)
});


app.listen(4002, () => {
  console.log("listening on port 4002");
})