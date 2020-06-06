const Joi = require('@hapi/joi')

const registerValidation = (req) => {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    const { error } = schema.validate(req.body)
    return error
}
const loginValidation = (req) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    const { error } = schema.validate(req.body)
    return error
}




module.exports = {registerValidation, loginValidation}