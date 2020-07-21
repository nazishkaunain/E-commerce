
const fs = require("fs");
const path = require("path");

const Cart = require(path.join(__dirname, "./cart.js"));

module.exports = class Product {
    constructor(id, t, imageUrl, description, price) {
        this.id = id;
        this.title = t;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    //method
    save() {

        const p = path.join(__dirname,"..","data","products.json");
        fs.readFile(p,(err, fileContent) => {

            let products = [];
            if(!err) {
                products = JSON.parse(fileContent);
            }
            let flag = false;
            products.forEach((product) => {
              if(product.id === this.id) {
                flag = true;
                product.title = this.title;
                product.imageUrl = this.imageUrl;
                product.price = this.price;
                product.description = this.description;
              }
            });

            (!flag) && products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });

        //products.push(this);
    }

    static deleteById(id) {
      const p = path.join(__dirname, "..", "data", "products.json");
      fs.readFile(p, (err, fileContent) => {
        let products = [];
        if(!err) {
          products = JSON.parse(fileContent);
        }
        //products after deleting a product
        let price;
        products.forEach((product) => {
          if(product.id === id) {
            price = product.price;
          }
        });

        const updatedProducts = products.filter(product => product.id !== id);
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          if(!err) {
            Cart.deleteProduct(id, price);
          }
          console.log("Product deleted successfully");
        });
      });
    }

    static fetchAll(cb) {
        const p = path.join(__dirname,"..","data","products.json");
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                return cb([]);
            }
            return cb(JSON.parse(fileContent));

        });
    }
    static findById(id, cb) {
        const p = path.join(__dirname, "..", "data", "products.json");
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            //console.log("products " + products);
            products.forEach((prod) => {
              if(prod.id === id) {
                console.log("my product", prod);
                return cb(prod);
              }
            });



            // let product = products.find(prod => prod.id === id);
            // console.log("my product",product);
            // return cb(product);
        });
    }
}
