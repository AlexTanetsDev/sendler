import Joi from "joi";

export const schemaCreateNewUser = Joi.object({
  user_login: Joi.string().required().min(3),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required() ,
  user_name: Joi.string().required().min(3),
  tel: Joi.number().integer().required(),
  user_password: Joi.string()
    .required()
    .min(8)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export const validationSchemaSignUp = Joi.object({
    login: Joi.string().required().label('Login'),
    password: Joi.string().required().label('Password'),
    repeatPassword: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .label('Repeat Password')
      .messages({
        'any.only': '{{#label}} does not match',
      }),
    phone: Joi.string().required().label('Phone'),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required() ,
    name: Joi.string().required().label('Name'),
  });

export const schemaNewDateUser = Joi.object({
  user_login: Joi.string().optional().allow("").min(3),
  tel: Joi.number().optional().allow(null),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional().allow(""),
  user_name: Joi.string().optional().allow("").min(3),
});

export const schemaUpdateUserPassword = Joi.object({
  oldPassword: Joi.string()
    .required()
    .min(8),
  newPassword: Joi.string()
    .required()
    .min(8)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});


export const schemaLogin = Joi.object({
  user_name: Joi.string().optional().allow("").min(3),
  user_password: Joi.string()
    .required()
    .min(8)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
