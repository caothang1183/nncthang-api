const db = require("../database");
const User = db.users;
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    const { first_name, last_name, email, password } = req.body;
    console.log(req.body);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        const user = {
          uuid: uuidv4(),
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: hash,
        };
        User.create(user)
          .then((data) => {
            return res
              .status(200)
              .send({ message: "register data successfully" });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User.",
            });
          });
      });
    });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
