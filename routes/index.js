var express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var router = express.Router();

var db;

// MongoClient.connect('mongodb+srv://vibhu_mst_user:QuC7dS0PiNYjdGW0@hackbugdb-98dz6.mongodb.net/test?retryWrites=true', (err, client) => {
//   if (err) return console.log(err)
//   db = client.db('HackBugDB') // whatever your database name is
//   app.listen(3000, () => {
//     console.log('listening on 3000')
//   })
// });
const uri = "mongodb+srv://vibhu_mst_user:QuC7dS0PiNYjdGW0@hackbugdb-98dz6.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  db = client.db("HackBugDB");
});



router.use(bodyParser.urlencoded({extended: true}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/form', function(req, res, next) {
  res.render('form');
});


/* GET home page. */
router.post('/quotes', function(req, res, next) {
  db.collection('users').find({mobile_Number: req.body.mobile_Number}).toArray(function(err, results) {
    if(results.length > 0)
    {
      res.send("Already Exist");
    }
    else
    {
      db.collection('users').save(req.body, (err, result) => {
        if (err) return console.log(err);
    
        console.log('saved to database');
        res.redirect('/userAll');
      })
    }
  });
  //res.send(req.body);
});

/* GET home page. */ 
router.get('/userAll', function(req, res, next) {
  db.collection('users').find().toArray(function(err, results) {
    res.send(results);
  });
  
});



client.close();

module.exports = router;


//qoutes 
//users