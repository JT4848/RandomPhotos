const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { checkAuth } = require("./utils");



router.get("/", (req, res) => {
  res.send("comment route working")
})

//post and delete comments

router.get("/comments", async (req, res) => {
  try{
    const comments = await prisma.comment.findMany();
    res.send(comments);
  } 
  catch (err) {
    console.error(err);
    res.status(500).send("Internal error");
  }
})

router.post("/usercom/:photoId", async (req, res) => {
  const { text } = req.body;
  const userId = req.user.id; 
  const photoId = Number(req.params.photoId)

  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        user: { connect: {id: userId} },
        photo: { connect: {id: photoId} }
      }
    });

    res.status(201).send(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).send("Internal Server Error");
  }
})

router.put("/:id", checkAuth, async (req, res) => {
  const { text } = req.body
  try {
    const comment = await prisma.comment.update({
      where: {id: Number(req.params.id)},
      data: { text },
    })
    if(!comment){
      res.status(400).send("Couldn't update comment")
    }
    else {
      res.status(201).send(comment);
    }
  }
  catch(err) {
    console.error(err);
    res.status(500).send("Internal error")
  }
})

router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const comment = await prisma.comment.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!comment) {
      res.status(400).send("comment not found")
    } else {
      res.status(201).send("comment deleted successfully");
    }
  } catch (error) {
    res.send(error);
  }
});


module.exports = router;