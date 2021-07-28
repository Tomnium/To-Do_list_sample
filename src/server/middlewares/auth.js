const tokenService = require('../services/jwt');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        let status = 200
        let message = "OK"

        if (!authHeader) {
            status = 401
            message = "401 Access denied: header error."
        }

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            status = 401
            message = "401 Access denied: access token invalid."
        }

        const userData = await tokenService.validateAccessToken(accessToken)

        if (!userData) {
            status = 401
            message = "401 Access denied: can't validate token."
        }

        status === 200?
                next():
                res.status(status)
                    .send({message})
    } catch {
        res.status(401)
            .send({ message: 'Invalid token' })
            
    }
}

module.exports = {
    authMiddleware
}
