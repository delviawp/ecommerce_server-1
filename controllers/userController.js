const { User } = require('../models')
const { comparePassword} = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
    static async login (req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }

            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            if(!user) {
                res.status(401).json({
                    message: `Invalid email/password`
                })
            } else if(!comparePassword(payload.password, user.password)) {
                res.status(401).json({
                    message: `Invalid email/password`
                })
            } else {
                const token = signToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({
                    message: 'user success to login',
                    statusCode: 200,
                    token: token
                })
            }

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = UserController