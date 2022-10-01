
const userSchema = require("../models/users");
const jwt = require('jsonwebtoken')

const checkUserExist = async (req, res, next) => {
    let users;
    try {
      users = await userSchema.find({ username: req.body.username });
  
      if (users.length == 0) {
        req.body.userExists = false;
      } else {
        req.body.userExists = true;
      }
      console.log("dwadawda")
      next();
    } catch (err) {
      console.log(err);
    }
  };

  const authenticateToken = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] //token portion of bearer token
    if(token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
      if(err) return res.sendStatus(403);
      req.user = user
      next()
  })
}

  module.exports = {checkUserExist, authenticateToken}