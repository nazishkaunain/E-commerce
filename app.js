const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const adminRoutes = require(path.join(__dirname, "routes", "admin.js"));

const shopRoutes = require(path.join(__dirname, "routes", "shop.js"));

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin",adminRoutes);
app.use(shopRoutes);

app.use("/", (req, res, next) => {
  res.status(404).render("404");
});


app.listen(3000, () => {
  console.log("The website is running on server 3000");
});
