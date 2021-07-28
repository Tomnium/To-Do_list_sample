const express = require('express')
const router = express.Router()
const { logInUser, signUpUser, logOutUser } = require('../controllers/auth')
const { refreshTokens, chechUserAuth } = require('../controllers/token')

router.post('/log-in', logInUser)
router.post('/log-out', logOutUser)
router.post('/sign-up', signUpUser)
router.post('/refresh', refreshTokens)
router.post('/user', chechUserAuth)

module.exports = router
