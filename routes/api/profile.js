const express = require('express');
const route = express.Router();

//@desc   Get profile
//@req    /api/profile
//access  Public
route.get('/', (req, res) => {
  res.send('Profile Route');
});

module.exports = route;
