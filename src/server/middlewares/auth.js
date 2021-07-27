const tokenService = require('../services/jwt');
const jwt = require('jsonwebtoken');

const auth = () => (req, res, next) => {
    try{
        const authHeader = req.headers.autorization;

        console.log(`AUTH MIDDLEWARE`)
        console.log(authHeader)

        if (!authHeader){
            res.status(401).json("401 Access denied: header error.");
            // return
        }
        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            res.status(401).json("401 Access denied: access token invalid.");
            // return
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData){
            res.status(401).json("401 Access denied: can't validate token.");
        }

        req.user = userData
        next()

    } catch{
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports ={
    auth
}
