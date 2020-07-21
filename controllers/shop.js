const path = require("path");
const express = require("express");
const Product = require(path.join(__dirname, "..", "models", "product.js"));
const Cart = require(path.join(__dirname,"..","models", "cart.js"));


exports.displayProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", { products: products, pageTitle: "Shop" });
  });
};
exports.getProduct = (req, res, next) => {
    //console.log("getProduct was called");
    const prodId = req.params.productId;
    //console.log(prodId);
    Product.findById(prodId, (product) => {
        console.log("my product",product);
        res.render("shop/product-detail", { product: product, pageTitle: product.title });
    });
};
exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop/index", { products: products, pageTitle: "Shop" });
    });
};
exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
      res.render("shop/cart", { pageTitle: "Your Cart" ,products: cart.products, totalPrice: cart.totalPrice});
    });

};

exports.postCart = (req, res, next) => {
  console.log(req.body.productId);
  productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(product.id, product.price);
    console.log("done cart");
    res.redirect("/cart");
  })
};

exports.postDeleteCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    console.log("Removed from the cart successfully");
    res.redirect("/cart");
  });

};

exports.getCheckOut = (req, res, next) => {
    res.render("shop/checkout", {
        pageTitle: "Checkout"
    });
};
exports.getOrders = (req, res, next) => {
    res.render("shop/orders", {
        pageTitle: "Your Orders"
    });
};
