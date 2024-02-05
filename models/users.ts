import Joi from "joi";

export const schemaCreateNewUser = Joi.object({
	user_login: Joi.string().required().min(3),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	user_name: Joi.string().required().min(3),
	tel: Joi.string()
		.pattern(/^\d{13,}$/)
		.required()
		.messages({
			"string.pattern.base":
				'Phone number must start with "+" and have at least 10 digits',
		}),
	user_password: Joi.string()
		.required()
		.min(8)
		.max(20)
		.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export const schemaNewDateUser = Joi.object({
	userLogin: Joi.string().required().min(3),
	tel: Joi.string()
		.pattern(/^\d{12,}$/)
		.required()
		.messages({
			"string.pattern.base":
				'Phone number must have at least 13 digits',
		}),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required(),
	password: Joi.string()
		.required()
		.min(8)
		.max(20)
		.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
	newPassword: Joi.string()
		.required()
		.min(8)
		.max(20)
		.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
	userName: Joi.string().required(),
});

export const schemaUpdateUserPassword = Joi.object({
	oldPassword: Joi.string().required().min(8),
	newPassword: Joi.string()
		.required()
		.min(8)
		.max(20)
		.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
