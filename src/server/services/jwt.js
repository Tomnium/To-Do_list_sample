const jwt = require('jsonwebtoken')
const { User, Token } = require('../db/models')


const access_secret = "access_secret"
const refresh_secret = "refresh_secret"

const generateTokens = async (userId) => {
    const accessToken = jwt.sign({userId}, access_secret, {expiresIn: "30s"})
    const refreshToken = jwt.sign({userId}, refresh_secret, {expiresIn: "30d"})

    return {accessToken, refreshToken}
}

const saveToken = async (userId, refreshToken) => {

  const token = await Token.findOne({ where: {user: userId} });
  if(token){
    token.refreshToken = refreshToken;
    return token.save();
  } else {
    const newToken = await Token.create({user:userId, refreshToken});
    return newToken;
  }
}

const removeToken = async (refreshToken) => {
  const tokenData = await Token.destroy({
    where: {
      refreshToken
    }
  })
}

const validateAccessToken = async (token) => {
    try {
        const userData = jwt.verify(token, access_secret);
        return userData;
      } catch (error) {
        throw null;
      }
}

const validateRefreshToken = async (token) => {
    try {
        const userData = jwt.verify(token, refresh_secret);
        return userData;
      } catch (error) {
        throw null;
      }
}

module.exports = {
  generateTokens,
  saveToken,
  removeToken,
  validateAccessToken,
  validateRefreshToken
}