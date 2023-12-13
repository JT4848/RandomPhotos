const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { checkAuth } = require("./utils");
const prisma = new PrismaClient();

router.get("/", (req, res) => {
  res.send("user route working")
})

router.get("/me", checkAuth, async (req, res) => {
  const user = await prisma.user.findUnique ({
    where : {id: req.user},
    select: {
      username: true,
      password: true,
      firstName: true,
      lastName: true,
      photos: true,
      comments: true,
    }
  })
  res.send(user);
})


router.get("/:username", async (req, res) => {
  const username = req.params.username;
  try{
    const user = await prisma.user.findUnique({
      where: {username: username},
      select: {
        firstName: true,
        lastName: true,
        username: true,
        photos: true,
        comments: true,
      }
    })
    if (user) {
      res.status(201).send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.put("/:id", checkAuth, async (req, res) => {
  try{
    const userId = Number(req.params.id)
    const updatedUser = await prisma.user.update({
      where: {
      id: userId
    },
    data: req.body
  })
  if (updatedUser) {
    res.status(200).send(updatedUser);
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
} catch (error) {
  console.error(error);
  res.status(500).send({ message: "Internal Server Error" });
}
})




module.exports = router;
