const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { checkAuth } = require("./utils");


router.get("/", (req, res) => {
  res.send("photo route working")
})

router.get("/photos", async (req, res) => {
  try {
    const photos = await prisma.photo.findMany();
    res.send(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
  const photoId = Number(req.params.id);

  try {
    const photo = await prisma.photo.findUnique({
      where: { id: photoId }
    });

    if (!photo) {
      res.status(404).send("Photo not found");
      return;
    }

    res.send(photo);
  } catch (error) {
    console.error("Error fetching photo:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/newpic", checkAuth, async (req, res) => {
  const { photos, description } = req.body;
  const userId = req.user.id;

  try{
    const newPic = await prisma.photo.create({
      data: {
        photos,
        description,
        user_Id: userId
      }
    })
    if (!newPic) {
      res.status(404).send("Couldnt post");
      return;
    }
    res.status(201).send(newPic);
  }
  catch(err){
    console.error(err);
    res.status(500).send("Internal error")
  }
})

router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const photo = await prisma.photo.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!photo) {
      res.status(400).send("photo not found")
    } else {
      res.status(201).send("photo deleted successfully");
    }
  } catch (error) {
    res.send(error);
  }
});



module.exports = router;
