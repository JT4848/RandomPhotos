const express = require("express");
const router = express.Router();
const user = require("./user");
const photo = require("./photo")
const comment = require("./comment")

router.get("/", (req, res) => {
  res.send("api route working")
})

router.use("/user", user);
router.use("/photo", photo);
router.use("/comment", comment)




module.exports = router;
