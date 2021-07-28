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
const chechUserAuth = async(req, res) => {
    try{
        if(req.cookies.refreshToken){ 
            const token = req.cookies.refreshToken;
            const data = await validateRefreshToken(token)
            console.log(data)
            res.status(200).json({userIsAuth: true, data})
        } else{
            res.status(403).json({userIsAuth: false, message:"cookie doesnt contain token"})
        }
    } catch(e){
        res.status(403).json({userIsAuth: false, message:e.message? e.message:"Exception occured"})
    } 
}
module.exports = {
    refreshTokens,
    chechUserAuth
}
