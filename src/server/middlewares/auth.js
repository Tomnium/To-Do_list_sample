const tokenService = require('../services/jwt');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "401 Access denied: header error.",
                header: req.headers
            });
            // throw new Error("Access denied: header error.")
        }

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(401).json("401 Access denied: access token invalid.");
            // throw new Error("Access denied: access token invalid.")
        }

        const userData = await tokenService.validateAccessToken(accessToken)

        if (!userData) {
            return res.status(401).json("401 Access denied: can't validate token.");
            // throw new Error("Access denied: can't validate token.")
        }

        req.user = userData
        next()

    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = {
    auth
}
