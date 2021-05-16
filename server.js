require('module-alias/register');
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:5001"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const db = require("@database");

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to nncthang API" });
});

const userRoute = require("@routes/user.routes.js");
app.use("/api/users", userRoute)


// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});