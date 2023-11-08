import Joi from "joi";

export const schemaCreateNewUser = Joi.object({
    user_login: Joi.string().required(),
    email: Joi.string().email().required(),
    user_name: Joi.string().required(),
    tel: Joi.number().integer().required(),
    user_password: Joi.string().required(),
  });


  export const schemaNewDateUser = Joi.object({
    user_login: Joi.string().optional().allow(""),
    tel: Joi.number().optional().allow(null),
    email: Joi.string().email().optional().allow(""),
    user_name: Joi.string().optional().allow(""),
  });