import Joi from "joi";

import { schemaClient } from "./clients";

export const schemaReqUpdateClient = Joi.object({
	client: schemaClient.required(),
});

export const schemaReqCreateGroup: Joi.ObjectSchema<any> = Joi.object({
	groupName: Joi.string().required(),
	clients: Joi.array().items(schemaClient).required(),
	cache: Joi.string(),
});

export const schemaReqUpdateGroup: Joi.ObjectSchema<any> = Joi.object({
	clients: Joi.array().items(schemaClient).required(),
	cache: Joi.string(),
});
