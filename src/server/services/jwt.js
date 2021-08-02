const jwt = require('jsonwebtoken')
const { User } = require('../db/models')

const access_secret = "access_secret"
const refresh_secret = "refresh_secret"

const generateTokens = async ({ id, email }) => {
  const accessToken = jwt.sign({ id, email }, access_secret, { expiresIn: "30s" })
  const refreshToken = jwt.sign({ id, email }, refresh_secret, { expiresIn: "30d" })

  return { accessToken, refreshToken }
}

const validateAccessToken = async (token) => {
  try {
    const userData = jwt.verify(token, access_secret)
    return {...userData}
  } catch (error) {
    throw error
  }
}

const validateRefreshToken = async (token) => {
  try {
    const userData = jwt.verify(token, refresh_secret)
    return {...userData, token}
  } catch (error) {
    throw error
  }
}

const refresh = async (refreshToken) => {

  if (!refreshToken) {
    throw new Error("refreshToken undefined")
  }
  const token = await validateRefreshToken(refreshToken)
  if (!token ) {
    throw new Error(`Can't find refresh token or it is doesn't valid`)
  }
  const userData = await User.findOne({where:{id:token.id}})
  const tokens = await generateTokens(userData) 

  return { userData, ...tokens }
}

module.exports = {
  generateTokens,
  validateAccessToken,
  validateRefreshToken,
  refresh
}
