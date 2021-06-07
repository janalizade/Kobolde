const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../../../http/middlewares/uploadMiddleware");
//controllers
const AdminController = require("../../../http/controllers/admin.controller.js");
const CategoryController = require("../../../http/controllers/category.controller.js");
const ProductController = require("../../../http/controllers/product.controller.js");
//middlewares
const Auth = require("../../../http/middlewares/auth");
const Admin = require("../../../http/middlewares/admin");
//auth
//router.post("/product", ProductController.create);
router.post("/register", AdminController.register);
router.post("/login", AdminController.login);
router.get("/current", [Auth, Admin], AdminController.current);
//users
router.post("/users", [Auth, Admin], AdminController.create);
router.get("/users", [Auth, Admin], AdminController.getAll);
router.get("/users/:id", [Auth, Admin], AdminController.getById);
router.patch("/users/:id", [Auth, Admin], AdminController.update);
router.delete("/users/:id", [Auth, Admin], AdminController.remove);
//orders
router.get("/orders", [Auth, Admin], AdminController.getUserOrders);
//categories
router.post("/category", CategoryController.create);
router.get("/health", CategoryController.health);
router.get("/category", CategoryController.getAll);
router.get("/category/:id", CategoryController.getById);
router.get("/categoryx/:title", CategoryController.getByCategoryTilte);
router.patch("/category/:id", CategoryController.update);
router.delete("/category/:id", CategoryController.remove);


//router.post("/product",uploadMiddleware.uploadImage.single('image'), ProductController.create);
router.post("/product",uploadMiddleware.uploadImage.single('image'), ProductController.create);
router.post("/productx",uploadMiddleware.uploadImage.single('image'), ProductController.createAll);
router.get("/product", ProductController.getAll);
router.get("/product/:categoryId", ProductController.getById);
router.get("/productx/:id", ProductController.getByCategoryId);
router.delete("/product/:id", ProductController.remove);
module.exports = router;
