const jwt =  require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // get token from header
    const token = req.header('x-auth-token');

    // check if not token
    if(!token){
        return res.status(401).json({msg:'No token, auth denied'});
    }

    // if there is token verify it
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'});
    }

}