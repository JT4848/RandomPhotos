const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



router.get("/", (req, res) => {
  res.send("auth route working")
})

router.post("/register", async (req, res) => {
  try{
    const user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    const result = await prisma.user.create({
      data: user
    })
    if(result){
      const token = jwt.sign({id: result.id}, process.env.JWT);
      res.status(201).send({token, user});
    } else{
      res.send({message: "User could not be created"});
    }
  } catch(err){
    res.status(500).send(err.message);
  }
})

router.post("/login", async (req, res) => {
  try{
    const {username, password} = req.body;
  
    const user = await prisma.user.findUnique({
      where: {username: username}
    })
    if(user){
      const passwordMatch = await bcrypt.hash(password, user.password);
      if(passwordMatch){
        const token = jwt.sign({id: user.id}, process.env.JWT)
        res.status(200).send({user, token})
      }
    }
    else{
      res.send({message: "Could not login"} )
    }
  } catch(err){
    res.status(500).send(err.message)
  }
})

module.exports = router;