const path = require("path");
const Product = require(path.join(__dirname, "..", "models", "product.js"));

exports.getAddProducts = (req, res, next) => {
  res.render("admin/edit-product", { pageTitle: "Add Product", editing: false });
};

exports.addNewProduct = (req, res, next) => {
  //products.push({ title: req.body.title });
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const id = Math.random().toString();

  const product = new Product(id, title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.getEditProducts = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if(!product) {
      console.log("No such product exists");
      return res.redirect("/");
    }
    res.render("admin/edit-product", { pageTitle: "Edit Product", editing: editMode, product: product });
  });

};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
  updatedProduct.save();
  console.log("Product updated");
  res.redirect("/admin/products");
};
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  console.log("Product deleted successfully");
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      products: products,
      pageTitle: "Admin Products",
    });
  });
};
