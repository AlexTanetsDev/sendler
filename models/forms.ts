import Joi from "joi";

export const validationSchemaFeedback = Joi.object({
	name: Joi.string().label("name").allow(''),
	phone: Joi.string()
		.pattern(/^\+\d{10,}$/)
		.optional().allow("")
		.messages({
			"string.pattern.base":
				'Phone number must start with "+" and have at least 10 digits',
		}),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required(),
	desc: Joi.string().required().label("desc"),
});

export const validationSchemaSignUp = Joi.object({
	login: Joi.string().required().label("Login"),
	password: Joi.string().required().label("Password").min(8).max(20),
	repeatPassword: Joi.string()
		.required()
		.valid(Joi.ref("password"))
		.label("Repeat Password")
		.min(8)
		.max(20)
		.messages({
			"any.only": "{{#label}} does not match",
		}),
	phone: Joi.string()
		.pattern(/^\+\d{10,}$/)
		.required()
		.messages({
			"string.pattern.base":
				'Phone number must start with "+" and have at least 10 digits',
		}),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required(),
	name: Joi.string().required().label("Name"),
});

export const schemaLogin = Joi.object({
	login: Joi.string().required().label("Login").min(3),
	password: Joi.string().required().label("Password").min(8).max(20),
});

export const validationSchemaCreateClient = Joi.object({
	phone: Joi.string()
		.pattern(/^\+\d{10,}$/)
		.required()
		.messages({
			"string.pattern.base":
				'Phone number must start with "+" and have at least 10 digits',
		}),
	lastName: Joi.string().label('Last name').min(0),
	firstName: Joi.string().label('First name').min(0),
	midleName: Joi.string().label('Midle name').min(0),
	day: Joi.string().label('Day').min(0),
	month: Joi.string().label('Month').min(0),
	year: Joi.string().label('Year').min(0),
	parameter1: Joi.string().label('Parameter 1').min(0),
	parameter2: Joi.string().label('Parameter 2').min(0)
});
