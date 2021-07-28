const { logIn, createUser } = require('../services/auth')
const { request } = require("express");

const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const { userEmail, ...tokens } = await logIn(email, password)

        // {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}

        res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true })
        // console.log(`LOGINUSER ----------- ${tokens.refreshToken}`)

        res.status(200).json({ isLogined: true, loggedInUser: userEmail, ...tokens })

    } catch (e) {
        res.status(400).json({ didLogIn: false, error: e.message })
    }
}

const signUpUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const { userEmail, ...tokens } = await createUser(email, password)

        res.cookie('refreshToken', tokens.refreshToken);
        res.status(200).json({ didLogIn: true, loggedInUser: userEmail, ...tokens })
    } catch (e) {
        res.status(400).json({ didLogIn: false, error: e.message })
    }
}

const logOutUser = async (req, res) => {
    try {

        res.clearCookie('refreshToken')

        res.status(200).json({ didLogOut: true })
    } catch (e) {
        res.status(400).json({ didLogOut: false, error: e.message })
    }
}

module.exports = {
    logInUser,
    signUpUser
}
