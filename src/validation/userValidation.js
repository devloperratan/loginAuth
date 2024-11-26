
const joi = require('joi')
exports.createUserVaidation = (validator) => {
    const createUserValidationSchema = joi.object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        phone: joi.string().required()
    })

    return createUserValidationSchema.validate(validator)
}

