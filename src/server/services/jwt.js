const jwt = require('jsonwebtoken')
const { User, Token } = require('../db/models')

const access_secret = "access_secret"
const refresh_secret = "refresh_secret"

const generateTokens = async ({ id, email }) => {
  const accessToken = jwt.sign({ id, email }, access_secret, { expiresIn: "30s" })
  const refreshToken = jwt.sign({ id, email }, refresh_secret, { expiresIn: "30d" })

  return Promise.resolve({ accessToken, refreshToken })
}

// deprecated: will be deleted in the next patch
const saveToken = async (userId, refreshToken) => {
  const token = await Token.findOne({ where: { user: userId } })
  if (token) {
    token.refreshToken = refreshToken;
    return Promise.resolve(token.save())
  } else {
    const newToken = await Token.create({ user: userId, refreshToken })
    return Promise.resolve(newToken)
  }
}

// deprecated: will be deleted in the next patch
const removeToken = async (refreshToken) => {
  const tokenData = await Token.destroy({
    where: {
      refreshToken
    }
  })
  return Promise.resolve(tokenData)
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
    console.log(`VALIDATEREFRESHTOKEN: `)
    console.log(token)
    const userData = jwt.verify(token, refresh_secret);
    return Promise.resolve(userData);
  } catch (error) {
    return Promise.reject(error);
  }
}

const findToken = async (refreshToken) => {
  const userData = await Token.findOne({ where: { refreshToken } });
  return Promise.resolve(userData);
}

const refresh = async (refreshToken) => {

  if (!refreshToken) {
    return Promise.reject("refreshToken undefined")
  }
  const userData = await validateRefreshToken(refreshToken)
  const token = await findToken(refreshToken)

  if (!userData || !token) {
    return Promise.reject(`Can't find refresh token or it is doesn't valid`)
  }
  const tokens = await generateTokens(userData)
  await saveToken(userData.id, tokens.refreshToken)

  return { userData, ...tokens }
}

module.exports = {
  generateTokens,
  saveToken,
  removeToken,
  validateAccessToken,
  validateRefreshToken,
  findToken,
  refresh
}
