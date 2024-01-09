import Joi from "joi";

import { IClient, IClientReq, ITel } from "@/globaltypes/types";

export const schemaClient: Joi.ObjectSchema<IClient> = Joi.object({
	tel: Joi.string()
		.pattern(/^\+\d{10,}$/)
		.required()
		.messages({
			"string.pattern.base":
				'Phone number must start with "+" and have at least 10 digits',
		}),
	first_name: Joi.string().allow(""),
	middle_name: Joi.string().allow(""),
	last_name: Joi.string().allow(""),
	date_of_birth: Joi.string().allow(""),
	parameter_1: Joi.string().allow(""),
	parameter_2: Joi.string().allow(""),
});

export const schemaReqClient: Joi.ObjectSchema<IClientReq> = Joi.object({
	client: schemaClient.required(),
});

export const schemaSearchClient: Joi.ObjectSchema<number> = Joi.object({
	tel: Joi.string()
})
