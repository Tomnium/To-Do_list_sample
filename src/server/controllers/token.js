const {
    generateTokens,
    saveToken,
    validateRefreshToken,
    findToken,
    refresh
} = require('../services/jwt')

const refreshTokens = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        const userData = await refresh(refreshToken)
        
        res.status(200).cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }).json({ isRefreshed: true, oldRefresh: refreshToken , userData})
    } catch (e) {
        res.status(404).json({ isRefreshed: false, error: e.message ? e.message : "Can't refresh token", cookie: req.cookies })
    }
}

module.exports = {
    refreshTokens
}
