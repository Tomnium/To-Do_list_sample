const { logIn, createUser, checkEmail } = require('../services/auth')
const { getList } = require('../services/tasks')

const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const { user, ...tokens } = await logIn(email, password)
        const tasks = await getList(user.dataValues.id)
        res.status(200).cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }).json({ isLogined: true, user, ...tokens, tasks })
    } catch (error) {
        res.status(409).send({ didLogIn: false, message: error.message })
    }
}

const signUpUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const { user, ...tokens } = await createUser(email, password)
        res.status(200).cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}).json({ didLogIn: true, user  , ...tokens})

    } catch (error) {
        res.status(409).send({ didLogIn: false, message: error.message })
    }
}

const logOutUser = async (req, res) => {
    try {
        res.status(200).json({ didLogOut: true })
    } catch (e) {
        res.status(404).json({ didLogOut: false, error: e.message })
    }
}

const checkNewEmail = async(req, res) => {
    try{
        const { email } = req.body
        const user = await checkEmail(email)

        res.status(200).json({emailIsRegistred: true, user})
    } catch(e){
        res.status(403).json({emailIsRegistred: false, error: e.message})
    }
}

module.exports = {
    logInUser,
    signUpUser,
    logOutUser,
    checkNewEmail
}
