const {
    generateTokens,
    saveToken,
    validateRefreshToken,
    findToken,
    refresh
} = require('../services/jwt')

const refreshTokens = async (req, res) => {
    try{
        console.log(JSON.stringify(req.cookies))

        const {refreshToken} = req.cookies;

        const userData = await refresh(refreshToken)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

        res.status(200).json({isRefreshed: true})
    } catch(e){
        res.cookie('TEST', "TEST_COOKIE")
        res.status(400).json({isRefreshed: false, error: e.message? e.message: "Couldn't refresh token"})
    }
}

module.exports = {
    refreshTokens
}
