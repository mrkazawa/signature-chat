'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

var balance = 1000;

app.get('/', (req, res) => {
  const bookData = {
    isbn: "0-13-239077-9",
    quantity: "1",
    unitprice: "111.00"
  };
  res.render('index', {
    balance: balance,
    bookData: bookData
  });
});

app.post('/confirm', function (req, res) {
  balance = balance - req.body.unitprice;
  res.redirect("/");
});

// add endpoint to download server public key
// add endpoint to register user
// add endpoint to send chat message

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});