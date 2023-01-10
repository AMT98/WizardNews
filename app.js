const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const postBank = require('./postBank');
const postList = require('./views/postList');
const postDetail = require('./views/postDetails');

app.use(morgan('dev'));

const homeMiddleware = express.static(path.join(__dirname, 'public'));
app.use(homeMiddleware);

// list
app.get('/', (req, res) => {
  res.send(postList);
});

app.get('/posts/:id', (req, res) => {
  const post = postBank.find(req.params.id);
  if (!post.id) {
    res.status(404);
    res.send(postDetail.error);
  } else {
    res.send(postDetail.detail(post));
  }
});

const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port http://localhost:${PORT}/`);
});
