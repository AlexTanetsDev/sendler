import Joi from "joi";

import {
	IClient,
	IGroupName
} from "@/globaltypes/types";

export const schemaClient = Joi.object({
	tel: Joi.number().integer(),
	first_name: Joi.string(),
	middle_name: Joi.string(),
	last_name: Joi.string(),
	date_of_birth: Joi.date(),
	parameter_1: Joi.string(),
	parameter_2: Joi.string(),
});

export const schemaReqCreateGroup = Joi.object({
	groupName: Joi.string(),
	clients: Joi.array().items(schemaClient),
	cache: Joi.string(),
});

// export const schemaClients: Joi.ArraySchema<IClient[]> = Joi.array().items(schemaClient);

// export const schemaGroupName: Joi.ObjectSchema<IGroupName> = Joi.object({
// 	groupName: Joi.string,
// });


export const schemaCreateNewUser = Joi.object({
	user_login: Joi.string().required().min(3),
	email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
	user_name: Joi.string().required().min(3),
	tel: Joi.number().integer().required(),
	user_password: Joi.string()
		.required()
		.min(8)
		.max(20)
		.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
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