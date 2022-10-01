const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const userSchema = require("../models/users");
const userSchema = require("../models/memes");
const signUp = async (req, res) => {
  if (req.body.userExists == true) {
    return res.status(400).json({ userExists: true });
  }
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new userSchema({
    username: username,
    password: password,
  });

//   const newCart = new cartSchema({
//     _id: req.body.username,
//     items: req.body.items,
//   });

  try {
    const data = await newUser.save();
    console.log("User Created");
    data = await newCart.save();
    console.log("Cart Created");
  } catch (err) {
    res.status(500).send(err);
  }
};

const login = async (req, res) => {
  if (req.body.userExists == false)
    return res.status(400).json({ userExists: false, user: null });
  try {
    const login = await userSchema.find({
      username: req.body.username,
      password: req.body.password,
    });

    res.send({ user: req.body.username });
  } catch (err) {
    console.log({ message: err });
  }
};

const signUpJWT = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    // salt generates unique hash for every same pass
    const hashedPassword = await bcrypt.hash(req.body.password, salt); // number indicates length of salt

    const user = { name: req.body.name, password: hashedPassword };

    const newUser = new userSchema({
      username: req.body.name,
      password: hashedPassword,
    });

    const newCart = new cartSchema({
      _id: req.body.name,
      items: null,
    });

    console.log(salt);
    console.log(hashedPassword);

    await newUser.save();
    console.log("User Created");
    data = await newCart.save();
    console.log("Cart Created");

    res.send("User signed up");
  } catch (err) {
    res.status(500).send(err);
  }
};

const posts = [
  {
    user: "admin",
    post: "I am giga admin"
  },

  {
    user: "raj",
    post: "I am giga chad"
  }
];

const loginJWT = async (req, res) => {
  // const user = users.find(user => user.name = req.body.name)

  try {

    const user = await userSchema.find({
      username: req.body.name,
    });
    
    if (user == null) {
      return res.status(400).send("Cant find user");
    }
    
    if (await bcrypt.compare(req.body.password, user[0].password)) {
      console.log("Success")

      const accessToken = jwt.sign(user[0].username, process.env.ACCESS_TOKEN_SECRET)





      res.json({accessToken: accessToken});
    } else {
      res.send("Not allowed");
    }
  } catch (err){
    res.status(500).send(err)
  }
};

module.exports = { signUp, login, signUpJWT, loginJWT };