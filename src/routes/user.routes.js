const users = require("../controllers/user.controller");

const router = require("express").Router();

router.post("/register", users.create);

router.get("/", users.findAll);

router.get("/activated", users.findAllActive);

router.get("/:id", users.findOne);

router.put("/:id", users.update);

router.delete("/:id", users.delete);

router.delete("/", users.deleteAll);

module.exports = router;