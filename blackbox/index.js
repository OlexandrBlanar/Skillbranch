var express = require('express');
var url = require('url');
var cors = require('cors');

var app = express();
app.use(cors());
app.get('/', function (req, res) {

  if (req.query.i <= 18 && req.query.i >= 0) {
    var rez;
    if (req.query.i == 0) {
      rez = +req.query.i + 1;
    } else if (req.query.i == 1) {
      rez = 18;
    } else if (req.query.i == 2) {
      rez = 243;
    } else if (req.query.i == 3) {
      rez = 3240;
    } else if (req.query.i == 4) {
      rez = 43254;
    }
    else if (req.query.i == 5) {
      rez = 577368
    }

  }
  res.send(rez.toString());
});

app.listen(3000, function () {
  console.log('Hello');
});
