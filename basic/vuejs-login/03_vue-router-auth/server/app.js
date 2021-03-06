"use strict"
const express = require('express')
const DB = requre('./db')
const config = require('./config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const db = new DB('sqlitedb')
const app = express()
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false}))
router.use(bodyParser.json())


//CORS middleware
const allowCrossDomain = function(req, res, next){
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', '*');
  next();
}

app.use(allowCrossDomain)


router.post('/register', function(req, res){
      db.insert([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8)
      ],
      function(err){
        if (err) return res.status(500).send("There was problem registring user")
        db.selectByEmail(req.body.email, (err, user) =>
          if (err) return res.status(500).send("There was problem getting user")
          let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
          res.status(200).send({ auth: true, token: token, user: user});
        });
      });
})

router.post('/register-admin', function(req, res){
  db.insertAdmin([
    req.body.name,
    req.body.email,
    bcrypt.hashSync(req.body.password, 8)
  ],
  function (err){
    if (err) return res.status(500).send("There was problem register the user.")
    db.selectByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send("There was getting user")
        let token = jwt.sign({id: user.id}, config.secret, {expiresIn: 86400});
        res.status(200).send({auth: true, token: token, user: user});
    });
  });
});


router.post('/login', (req, res)=> {
      db.selectByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found');
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token:token, user:user });
      });
})
