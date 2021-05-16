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
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        const user = {
          id: uuidv4(),
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
                err.message || "Error occurred while creating user.",
            });
          });
      });
    });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

exports.findAll = (req, res) => {
  const firstName = req.query.first_name;
  var condition = firstName ? { first_name: { [Op.iLike]: `%${first_name}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while retrieving users."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting user with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while removing all user."
      });
    });
};

exports.findAllActive = (req, res) => {
  User.findAll({ where: { activated: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while retrieving users."
      });
    });
};