var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const Api = require("../apis/api")

/* GET home page. */
router.get('/', (req, res)=> {
  User.find().then((users)=>
  res.render('index', { title: 'Express', users})
  )
});

/* GET from API */
router.get('/api', (req, res)=> {
  Api.getAll().then((entity)=>
  res.render('index', { title: 'Express', users: entity})
);
});

module.exports = router;
