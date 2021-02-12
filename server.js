// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// https://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node
// processing x-forwarded-for only if set, if so, take the first address, other params use
// optional chaining
const parseIp = (req) =>
    (typeof req.headers['x-forwarded-for'] === 'string'
        && req.headers['x-forwarded-for'].split(',').shift())
    || req.connection?.remoteAddress
    || req.socket?.remoteAddress
    || req.connection?.socket?.remoteAddress

// your first API endpoint... 
app.get("/api/whoami", function (req, res) {
  // could use req.ip from express but will return a variation of 127.0.0.1 
  // if the server is running behind a proxy
  res.status(200).json({ 
    "ipaddress": parseIp(req), 
    "language": req.header("Accept-Language"), 
    "software": req.header("User-Agent") 
  });
});


// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
