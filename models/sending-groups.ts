import Joi from "joi";

import { schemaClient } from "./clients";

import { IClientUpdateReqArray, IClentCreateReqArray } from "@/globaltypes/types";

export const schemaReqCreateGroup: Joi.ObjectSchema<IClentCreateReqArray> = Joi.object({
	groupName: Joi.string().required(),
	clients: Joi.array().items(schemaClient).required(),
	cache: Joi.string(),
});

export const schemaReqUpdateGroup: Joi.ObjectSchema<IClientUpdateReqArray> = Joi.object({
	clients: Joi.array().items(schemaClient).required(),
	cache: Joi.string(),
});
