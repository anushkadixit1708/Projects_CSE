const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../models/User');

// @route     POST api/users
// @desc      register a user
// @access    Public    
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Pls input valid email').isEmail(),
    check('password', 'Pls input password with 6 or more char').isLength({min:6})
], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({email: email});

        if(user){
            return res.status(400).json({msg:'User already exists'});
        }

        user = new User({name:name, email:email, password:password});

        // hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save in db
        await user.save();

        // jwt token and response
        const payload = {
            user: { id: user.id }
        };

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000
        }, (err, token)=>{
            if (err) throw err;
            res.json({token});
        } )

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;