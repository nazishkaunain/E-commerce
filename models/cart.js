const fs = require('fs');
const path = require("path");

const p = path.join(__dirname, "..","data","cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = {prouducts: [], totalPrice: 0};
      //products is an array of objects  {id: , qty: }

      if(!err) {
        cart = JSON.parse(fileContent);
      }else console.log(err);
      let productExitsAlready = false;
      cart.products.forEach((prod) => {
        if(prod.id === id) {
          prod.qty += 1;
          productExitsAlready = true;
        }
      });
      if(!productExitsAlready) {
        cart.products.push({id: id, qty: 1});
      }
      cart.totalPrice += parseFloat(productPrice);
      console.log("into it");
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      })
    });
  }
  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if(err) {
        return;
      }
      let cart = {products: [], totalPrice: 0};
      cart = JSON.parse(fileContent);
      let quantity;
      cart.products.forEach((product) => {
        if(product.id === id) {
          quantity = product.qty;
        }
      });

      const updatedProducts = cart.products.filter(product => product.id !== id);
      const updatedTotalPrice = cart.totalPrice - (quantity*productPrice);
      const updatedCart = {products: updatedProducts, totalPrice: updatedTotalPrice};
      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        if(err) {
          console.log("The cart has been updated");
        }
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      let cart = {products: [], totalPrice: 0};
      if(!err) {
        cart = JSON.parse(fileContent);
        return cb(cart);
      } else {
        return cb(null);
      }
    });
  }

};
