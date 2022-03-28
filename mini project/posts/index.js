const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//posts array
const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post("/posts/create", async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = { id, title };

    await axios.post('http://event-bus-srv:4005/events', {
        type: "PostCreated",
        data: {
            id,
            title
        }
    }).then((response) => {
        console.log(response.data);
    }).catch((err) => {
        console.log("error is in sending event bus request ");
    });

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log("Recieved Event ", req.body.type);
    res.send({})
})

app.listen(4000, () => {
    console.log("listening on port 4000 successfully");
})