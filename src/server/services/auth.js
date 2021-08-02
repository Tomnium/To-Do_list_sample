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
    if(created){
        return {user, ...tokens} 
    }
    throw new Error("This email address has already been registered.")
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

    if(isPasswordValid){
        return {user, ...tokens} 
    }
    throw new Error("Invalid password")
}

const checkEmail = async(email) => {
    const user = await User.findOne({where:{email}})
    
    if(user){
        return {user}
    } 
    
    throw new Error("This email address has not been registered.")
}

module.exports = {
    createUser,
    logIn,
    checkEmail
}
