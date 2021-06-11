const express = require('express')
const router = express.Router()
const { logInUser, signUpUser } = require('../controllers/auth')

router.post('/log-in', logInUser)
router.post('/sign-up', signUpUser)

module.exports = router