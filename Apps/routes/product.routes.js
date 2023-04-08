const express = require("express");
const router = express.Router();
const controller = require("../controller/product.controller");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

//CREATE PRODUCT
router.post("/create", upload.single("image"), controller.create);

//GET ALL PRODUCTS
router.get("/getAll", controller.get);

module.exports = router;
