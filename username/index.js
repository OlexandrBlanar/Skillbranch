var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());
app.get('/', function (req, res) {

  var str = req.query.username
  var arr = str.split("/");
  var username;

  if (arr.length == 1) {
      username = str;
    } else if (arr.length == 2) {
      username = arr[1];
    } else if ( ~str.indexOf("//") ) {
      if ( ~arr[arr.length - 1].indexOf("?") ) {
              var newArr = arr[arr.length - 1].split(/\?/g);
              username = newArr[0];
      } else {
        username = arr[3];
      }
    } else {
      res.send('Invalid fullname');
    }

    res.send("@" + username.replace(/@/g, ""));

});

app.listen(3000, function () {
  console.log('Hello');
});
