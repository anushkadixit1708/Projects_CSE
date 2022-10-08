const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../models/User');

// @route     GET api/auth
// @desc      get logged in user
//  @access   Private    
router.get('/', auth, async(req,res)=>{
    try {
        const user = await (await User.findById(req.user.id)).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:"Server error"});
    }
});

// @route     POST api/auth
// @desc      auth user and get token
//  @access   Public   
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
        // check if email exists in db
        let user = await User.findOne({ email:email });

        if(!user){
            return res.status(400).json({msg:'user doesnt exixts, pls register first'});
        }

        // check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: 'invalid credentials'});
        }
        // if pass matches return token
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
        res.status(500).json({msg:'Server error'});
    }
});

module.exports = router;