import Joi from "joi";

import { schemaClient } from "./clients";

import {
	IGroupUpdateReq,
	IGroupCreateReq,
	IGroupEditReq,
} from "@/globaltypes/types";

export const schemaReqCreateGroup: Joi.ObjectSchema<IGroupCreateReq> = Joi.object({
	group_name: Joi.string().required(),
	cache: Joi.string(),
});

export const schemaReqUpdateGroup: Joi.ObjectSchema<IGroupUpdateReq> = Joi.object({
	clients: Joi.array().items(schemaClient).required(),
	cache: Joi.string(),
});

export const schemaReqEditGroup: Joi.ObjectSchema<IGroupEditReq> = Joi.object({
	clients: Joi.array().items(Joi.number()).required()
})
