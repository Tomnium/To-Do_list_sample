const { User } = require('../db/models')
const tokenService = require('../services/jwt');
const bcrypt = require('bcrypt')

const createUser = async (email, password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const [user, created] = await User.findOrCreate({
        where: {
            email
        },
        defaults: {
            email,
            password: hashedPassword
        }
    })

    const tokens = await tokenService.generateTokens(user);
    // const variable = await tokenService.saveToken(user.id, tokens.refreshToken);

    return created ?
        Promise.resolve({user, ...tokens}) :
        Promise.reject(new Error("Already exists"))
}

const logIn = async (email, password) => {
    const user = await User.findOne({
        where: {
            email
        }
    })

    if (!user) return Promise.reject(new Error("User with such email does't exist"))
    const tokens = await tokenService.generateTokens(user);

    const isPasswordValid = await bcrypt.compare(password, user.password)

    return isPasswordValid ?
        Promise.resolve({user, ...tokens}) :
        Promise.reject(new Error("Invalid password"))
}

module.exports = {
    createUser,
    logIn
}
