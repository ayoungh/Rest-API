var open = require('open'),
  express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

//open connection to db
var db = mongoose.connect('mongodb://localhost/restAPI');

//require models
var Item = require('./models/itemModel');
var User = require('./models/userModel');

//instantiate app
var app = express();

//define the port
var port = process.env.PORT || 5000;

//tell express to use middleware for parsing the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Routes - as it is a function we execute

var itemRouter = require('./routes/itemRoutes')(Item);
var userRouter = require('./routes/userRoutes')(User);
//inject the item model into the function



//set the app to use this before all routes for itemRouter
app.use('/api/items', itemRouter);
app.use('/api/users', userRouter);


app.get('/', function (req, res) {
  res.send('Rest API');
});

app.listen(port, function () {
  console.log('Rest API running on: ', 'http://localhost:'+port);
  //open('http://localhost:'+port);
});
