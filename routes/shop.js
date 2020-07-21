const express = require("express");
const path = require("path");

const shopControllers = require(path.join(__dirname, "..", "controllers","shop.js"));

const router = express.Router();

router.get("/", shopControllers.getIndex);

router.get("/products",shopControllers.displayProducts);

router.get("/cart",shopControllers.getCart);

router.post("/cart",shopControllers.postCart);

router.get("/checkout", shopControllers.getCheckOut);

router.get("/orders", shopControllers.getOrders);

router.post("/cart-delete-item", shopControllers.postDeleteCart);


//if there is also a route /products/delete place it before /products/:product_id
//always keep the more specific route at the top
router.get("/products/:productId", shopControllers.getProduct);

module.exports = router;
