'use strict';

const express = require('express');
const crypto = require('crypto');
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
var hashes = new Set();

app.get('/', (req, res) => {
  const bookData = {
    isbn: "0-13-239077-9",
    quantity: "1",
    unitprice: "111.00",
    time: Math.floor(new Date().getTime() / 1000)
  };

  const payload = bookData.isbn + bookData.quantity + bookData.unitprice + bookData.time;
  const hash = crypto.createHash('sha256').update(payload).digest("hex");
  hashes.add(hash);

  res.render('index-answer', {
    balance: balance,
    bookData: bookData
  });
});

app.post('/confirm', function (req, res) {
  const payload = req.body.isbn + req.body.quantity + req.body.unitprice + req.body.time;
  const hash = crypto.createHash('sha256').update(payload).digest("hex");
  if (hashes.has(hash)) {
    balance = balance - req.body.unitprice;
    hashes.delete(hash);
  }
  res.redirect("/");
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});