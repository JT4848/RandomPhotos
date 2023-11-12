const express = require("express");
const app = express();
const path = require("path");
const PORT = 3987;


app.listen(PORT, () => {
  console.log('Listening on port', PORT);
})

app.use(require("body-parser").json());
app.use(require("morgan")("dev"));


app.use('/api', require('./api'));
