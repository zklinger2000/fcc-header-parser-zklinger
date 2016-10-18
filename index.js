const express = require('express');
const morgan = require('morgan');
const UAParser = require('ua-parser-js');

const app = express();

app.use(morgan('combined')); // Middleware for logging
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/api/whoami', function(req, res) {
  const parser = new UAParser();
  const ua = req.headers['user-agent'];
  const os = parser.setUA(ua).getOS();
  const lang = req.headers['accept-language'].split(',')[0];
  console.log(lang);

  res.json({
    ipaddress: req.connection.remoteAddress,
    language: lang,
    os: os.name + ' ' + os.version
  });
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
