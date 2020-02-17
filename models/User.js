require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

const user = [
  {
    username: "Luis",
    password: "123",
    email: "luis@gmail.com"
  },

  {
    username: "Pepe",
    password: "123",
    email: "pepe@gmail.com"
  },

  {
    username: "Erenesto",
    password: "123",
    email: "erenesto@gmail.com"
  },

  {
    username: "Maribel",
    password: "123",
    email: "maribel@gmail.com"
  },

  {
    username: "Jasmine",
    password: "123",
    email: "jasmine@gmail.com"
  }
];

mongoose
  .connect("mongodb://localhost/trail-flix", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    User.deleteMany()
      .then(() => {
        return User.create(user);
      })
      .then(() => {
        console.log("succesfully added all the data");
        mongoose.connection.close();
        process.exit(0);
      });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });