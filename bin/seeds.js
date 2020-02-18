
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

const user = [
  {
    username: "Luis",
    password: bcrypt.hashSync("Luis", bcrypt.genSaltSync(bcryptSalt)),
    //   },
    email: "luis@gmail.com"
  },

  {
    username: "Pepe",
    password: "456",
    email: "pepe@gmail.com"
  },

  {
    username: "Erenesto",
    password: "456",
    email: "erenesto@gmail.com"
  },

  {
    username: "Maribel",
    password: "456",
    email: "maribel@gmail.com"
  },

  {
    username: "Jasmine",
    password: "456",
    email: "jasmine@gmail.com"
  }
];

mongoose
  .connect(`s${dbUrl}`, {
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

User.deleteMany()
.then(() => {
  return User.create(user)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})

