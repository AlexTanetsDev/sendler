import Joi from "joi";

import {
	IClient,
	IClientReq,
	IClientUpdateReq,
	IClientsDeleteReq,
	ITel
} from "@/globaltypes/types";

export const schemaClient: Joi.ObjectSchema<IClient> = Joi.object({
	tel: Joi.string()
		.pattern(/^\d{12,}$/)
		.required()
		.messages({
			"string.pattern.base":
				'Phone number must  have at least 13 digits',
		}),
	first_name: Joi.string().allow(""),
	middle_name: Joi.string().allow(""),
	last_name: Joi.string().allow(""),
	date_of_birth: Joi.string().allow(""),
	parameter_1: Joi.string().allow(""),
	parameter_2: Joi.string().allow(""),
});

export const schemaClientDataBase: Joi.ObjectSchema<IClient> = Joi.object({
	client_id: Joi.number().required(),
	tel: Joi.string()
		.pattern(/^\d{12,}$/)
		.required()
		.messages({
			"string.pattern.base":
				'Phone number must have at least 13 digits',
		}),
	first_name: Joi.string().allow(""),
	middle_name: Joi.string().allow(""),
	last_name: Joi.string().allow(""),
	date_of_birth: Joi.string().allow(""),
	parameter_1: Joi.string().allow(""),
	parameter_2: Joi.string().allow(""),
});

export const schemaReqClient: Joi.ObjectSchema<IClientReq> = Joi.object({
	userId: Joi.number(),
	client: schemaClient.required(),
});

export const schemaReqAddClient: Joi.ObjectSchema<IClientReq> = Joi.object({
	userId: Joi.number(),
	groupId: Joi.number().required(),
	client: schemaClient.required(),
});

export const schemaReqDeleteClients: Joi.ObjectSchema<IClientsDeleteReq> = Joi.object({
	clientsId: Joi.array().items(Joi.number())
});

export const schemaReqClientUpdate: Joi.ObjectSchema<IClientUpdateReq> = Joi.object({
	client: schemaClientDataBase.required(),
});

export const schemaSearchClient: Joi.ObjectSchema<ITel> = Joi.object({
	tel: Joi.string()
})
