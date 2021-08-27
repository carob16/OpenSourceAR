const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('index.html');
});

var server = app.listen(8081, function () {
  //var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://localhost:%s', port);
});
