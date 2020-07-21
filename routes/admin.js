const express = require("express");
const path = require("path");

const adminControllers = require(path.join(
  __dirname,
  "..",
  "controllers",
  "admin.js"
));

const router = express.Router();

//admin/add-product because path filtering has been used in the app.js
router.get("/add-product", adminControllers.getAddProducts);

router.post("/add-product", adminControllers.addNewProduct);

router.get("/products", adminControllers.getProducts);

router.get("/edit-product/:productId", adminControllers.getEditProducts);

router.post("/edit-product", adminControllers.postEditProduct);

router.post("/delete-product", adminControllers.postDeleteProduct);

module.exports = router;
