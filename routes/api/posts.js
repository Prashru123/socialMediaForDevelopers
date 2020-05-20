const express = require('express');
const route = express.Router();

//@desc   Get Posts
//@req    /api/posts
//access  Public
route.get('/', (req, res) => {
  res.send('Posts Route');
});

module.exports = route;
