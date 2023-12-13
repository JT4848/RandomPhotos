const checkAuth = (req, res, next) => {
  if(req.user){
    next();
  } 
  else {
    res.status(401).send({message: "You need to be logged in to do that"});
  }
}

module.exports = {
  checkAuth
}