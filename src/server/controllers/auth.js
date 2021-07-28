const { logIn, createUser } = require('../services/auth')
const { request } = require("express");

const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const { userEmail, ...tokens } = await logIn(email, password)

        res.status(200).cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }).json({ isLogined: true, loggedInUser: userEmail, ...tokens })

    } catch (e) {
        res.status(404).json({ didLogIn: false, error: e.message })
    }
}

const signUpUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const { userEmail, ...tokens } = await createUser(email, password)

        
        res.status(200).cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}).json({ didLogIn: true, loggedInUser: userEmail , ...tokens})

    } catch (e) {
        res.status(409).json({ didLogIn: false, error: e.message })
    }
}

const logOutUser = async (req, res) => {
    try {
        // clearCookie('refreshToken').
        res.status(200).json({ didLogOut: true })
    } catch (e) {
        res.status(404).json({ didLogOut: false, error: e.message })
    }
}

module.exports = {
    logInUser,
    signUpUser,
    logOutUser
}
