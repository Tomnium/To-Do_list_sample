const jwt = require('jsonwebtoken')
const { User } = require('../db/models')

const access_secret = "access_secret"
const refresh_secret = "refresh_secret"

const generateTokens = async ({ id, email }) => {
  const accessToken = jwt.sign({ id, email }, access_secret, { expiresIn: "300s" })
  const refreshToken = jwt.sign({ id, email }, refresh_secret, { expiresIn: "30d" })

  return Promise.resolve({ accessToken, refreshToken })
}

const validateAccessToken = async (token) => {
  try {
    const userData = jwt.verify(token, access_secret);
    return Promise.resolve(userData);
  } catch (error) {
    return Promise.reject(error);
  }
}

const validateRefreshToken = async (token) => {
  try {
    const userData = jwt.verify(token, refresh_secret);
    return Promise.resolve({...userData, token});
  } catch (error) {
    return Promise.reject(error);
  }
}

const refresh = async (refreshToken) => {

  if (!refreshToken) {
    return Promise.reject("refreshToken undefined")
  }
  const token = await validateRefreshToken(refreshToken)
  if (!token ) {
    return Promise.reject(`Can't find refresh token or it is doesn't valid`)
  }
  const userData = await User.findOne({where:{id:token.id}});
  const tokens = await generateTokens(userData) 

  return { userData, ...tokens }
}

module.exports = {
  generateTokens,
  validateAccessToken,
  validateRefreshToken,
  refresh
}
