const express = require('express')
const router = express.Router()
const { logInUser, signUpUser } = require('../controllers/auth')
const { refreshTokens } = require('../controllers/token')

router.post('/log-in', logInUser)
router.post('/sign-up', signUpUser)
router.post('/refresh', refreshTokens)

module.exports = router
