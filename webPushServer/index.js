const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const constants = require('./config/constants');
let mongoose = require('mongoose');
mongoose.connect(constants.MONGO_URL);

app.use(function(req, res, next) {
  // allows requests from localhost you can fix the adresse
  // replace "*" by "http://localhost:8080" for example
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var routes = {};
routes.notification = require('./controllers/notification.js');

app.get('/key', routes.notification.key);
app.post('/push', routes.notification.subscribe);
app.post('/send', routes.notification.send);
app.post('/unsubscribe', routes.notification.unsubscribe);

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('App listening on port ' + port);
});

