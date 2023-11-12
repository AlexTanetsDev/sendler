import Joi from "joi";

import { IClient } from "@/globaltypes/types";

export const schemaClient: Joi.ObjectSchema<IClient> = Joi.object({
	tel: Joi.number().integer(),
	first_name: Joi.string(),
	middle_name: Joi.string(),
	last_name: Joi.string(),
	date_of_birth: Joi.date(),
	parameter_1: Joi.string(),
	parameter_2: Joi.string(),
});

export const schemaReqCreateGroup: Joi.ObjectSchema<any> = Joi.object({
	groupName: Joi.string(),
	clients: Joi.array().items(schemaClient),
	cache: Joi.string(),
});

export const schemaReqUpdateGroup: Joi.ObjectSchema<any> = Joi.object({
	clients: Joi.array().items(schemaClient),
	cache: Joi.string(),
});
