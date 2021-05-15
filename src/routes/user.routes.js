const users = require("../controllers/user.controller");

const router = require("express").Router();

router.post("/register", users.create);

module.exports = router;