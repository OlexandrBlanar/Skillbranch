var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());
app.get('/', function (req, res) {


  var arr = req.query.fullname.split(" ");
  switch(arr.length) {
    case 3:
      var fullname = arr[2] + " " + (arr[0][0] || "") + "\." + " " + (arr[1][0] || "") + "\.";
      break;
    case 2:
      var fullname = arr[1] + " " + (arr[0][0] || "") + "\.";
      break;
    case 1:
      var fullname = arr[0];
      break;
    default:
      res.send('Invalid fullname');
  }

  res.send(fullname);
});

app.listen(3000, function () {
  console.log('Hello');
});
