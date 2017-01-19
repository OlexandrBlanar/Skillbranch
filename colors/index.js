var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());
app.get('/*', function (req, res) {

  try {
    var color = req.query.color;

      color = color.replace(/\s/g, "");

      console.log(color);
    if (~color.indexOf("rgb")) {

      var index = color.indexOf("rgb");
      console.log(index);
      var rgbcolor = color.slice(4, (color.length - 1)).split(",");
      if (rgbcolor.length > 3) throw Error();
      var hexcolor = "";
      for (var i = 0; i < 3; i++) {
        if ((+rgbcolor[i]).toString(16).length == 1) {
           hexcolor = hexcolor + (+rgbcolor[i]).toString(16) + (+rgbcolor[i]).toString(16);
         } else {
          if (+rgbcolor[i] > 255 || isNaN(+rgbcolor[i])) throw Error();
           hexcolor += (+rgbcolor[i]).toString(16);
         }
         console.log(hexcolor);
      }
      res.send("#" + hexcolor);
      console.log(color);
    } else {
        color = color.replace(/#/, "");
        switch (color.length) {
          case 3:
            color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
            res.send("#" + color.toLowerCase());
            break;
          case 6:
            if (/[g-z]/i.test(color)) {
              res.send('Invalid color');
              break;
            }
            res.send("#" + color.toLowerCase());
            break;
          default:
            res.send('Invalid color');
      }
    }
  } catch (err) {
      res.send('Invalid color');
  }
});

app.listen(3000, function () {
  console.log('Hello');
});
