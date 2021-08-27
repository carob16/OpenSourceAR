const express = require('express');
const app = express();

app.use(express.static('public'));

app.set('port', process.env.PORT || 8080);

app.get('/', function (req, res) {
  res.send('index.html');
});

app.listen(app.get('port'), function () {
  console.log('server running', app.get('port'));
});
