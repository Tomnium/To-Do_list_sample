const { logIn, createUser } = require('../services/auth')

const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const userEmail = await logIn(email, password)
        res.status(200).json({ didLogIn: true, loggedInUser: userEmail })
    } catch (e) {
        res.status(400).json({ didLogIn: false, error: e.message })
    }
}

const signUpUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const userEmail = await createUser(email, password)
        res.status(200).json({ didLogIn: true, loggedInUser: userEmail })
    } catch (e) {
        res.status(400).json({ didLogIn: false, error: e.message })
    }
}

module.exports = { 
    logInUser,
    signUpUser
}