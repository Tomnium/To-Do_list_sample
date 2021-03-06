const express = require('express')
const router = express.Router()
const { logInUser, signUpUser, logOutUser, checkNewEmail } = require('../controllers/auth')
const { refreshTokens, chechUserAuth } = require('../controllers/token')

router.post('/log-in', logInUser)
router.post('/log-out', logOutUser)
router.post('/sign-up', signUpUser)
router.post('/refresh', refreshTokens)
router.post('/user', chechUserAuth)
router.post('/check-email', checkNewEmail)

module.exports = router
