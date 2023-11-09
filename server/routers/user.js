const express = require("express");
const Router = express.Router();
const { getAllUsers, createUsers, login } = require("../controllers/user");
const { addReview, getReview } = require("../controllers/product");

Router.post("/user",createUsers)
Router.post("/login",login)
Router.post("/product",addReview);
Router.get("/product/:productId",getReview)

module.exports = Router;
