var express = require('express');
var url = require('url');
var cors = require('cors');

var app = express();
app.use(cors());
app.get('/', function (req, res) {

  if (req.query.a) {
    var a = +req.query.a;
  } else {
    var a = 0;
  };
  if (req.query.b) {
    var b = +req.query.b;
  } else {
    var b = 0;
  };

    var sum = a + b;

  res.send(sum.toString());
});

app.listen(3000, function () {
  console.log('Hello');
});
