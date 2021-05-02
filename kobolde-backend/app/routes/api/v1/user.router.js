const express = require("express");
const router = express.Router();
//controllers
const UserController = require("../../../http/controllers/user.controller");
//middlewares
const Auth = require("../../../http/middlewares/auth");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/current", Auth, UserController.current);
router.post("/order", UserController.orderRequest);

module.exports = router;
