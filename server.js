const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(express.static(path.join(__dirname), { index: 'index.html' }));

app.set('port', process.env.PORT || 8080);

app.set('port', process.env.PORT || 8080);

app.get('/', function (req, res) {
  res.send('index.html');
});

app.listen(app.get('port'), function () {
  console.log('server running', app.get('port'));
});
