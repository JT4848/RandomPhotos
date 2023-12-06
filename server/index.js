const express = require("express");
const app = express();
const path = require("path");
const PORT = 3987;
const jwt = require('jsonwebtoken');



app.use(require("body-parser").json());
app.use(require("morgan")("dev"));


app.use((req, res, next) => {
  const auth = req.headers.authorization;
  
  const token = auth?.startsWith("Bearer ") ? auth.slice(7): null;
  
  try{
    const {id} = jwt.verify(token, process.env.JWT);
    req.user = {id};
  }catch{
    req.user = null;
  }
  next();
})

app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
})
