import Joi from "joi";
import { IUserAlfaNameReq } from "@/globaltypes/types";

export const schemaCreateNewUser = Joi.object({
	user_login: Joi.string().required().min(3),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	user_name: Joi.string().required().min(3),
	tel: Joi.string()
		.pattern(/^\d{12,}$/)
		.required()
		.messages({
			"string.pattern.base":
				'Phone number must  have at least 12 digits',
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
				'Phone number must have at least 12 digits',
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

export const schemaCreateAlfaName: Joi.ObjectSchema<IUserAlfaNameReq> = Joi.object({
	alfa_name: Joi.string().required(),
});

export const schemaReqCreateAlfaName: Joi.ObjectSchema<IUserAlfaNameReq> = Joi.object({
	alfa_name: Joi.string().required(),
	user_id: Joi.number().required()
});

export const schemaAddClientNumber: Joi.ObjectSchema<IUserAlfaNameReq> = Joi.object({
	tel: Joi.string()
		.pattern(/^\d{9,}$/)
		.required()
		.messages({
			"string.pattern.base":
				'Phone number must have at least 12 digits',
		}),
});
