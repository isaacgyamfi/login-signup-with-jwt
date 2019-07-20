//validation
const Joi = require('@hapi/joi');
//validation for register
const validation_register = (data) => {
    const schema = {
        title: Joi.string().min(2),
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        gender: Joi.string().max(6).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string(),
        phone: Joi.number().min(10),
        postalAddress: Joi.string().min(6).max(255)
    };
    return Joi.validate(data, schema);

}

//validation for login
const validation_login = (data) => {
    const schema = {
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string()
    };
    return Joi.validate(data, schema);
}

module.exports.validation_register = validation_register;
module.exports.validation_login = validation_login;