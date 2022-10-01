const express = require("express");
const router = express.Router();
const { signUp, login, signUpJWT, loginJWT} = require("../controllers/auth")
const {checkUserExist} = require("../middleware/auth")

router.post("/signup", checkUserExist, signUp);
router.post("/login", checkUserExist, login);
router.post("/signupJWT", signUpJWT);
router.post("/loginJWT", loginJWT);

module.exports = router;