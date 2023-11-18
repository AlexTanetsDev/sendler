import Joi from "joi";

import { IClient } from "@/globaltypes/types";

export const schemaClient: Joi.ObjectSchema<IClient> = Joi.object({
	tel: Joi.number().integer().required(),
	first_name: Joi.string(),
	middle_name: Joi.string(),
	last_name: Joi.string(),
	date_of_birth: Joi.date(),
	parameter_1: Joi.string(),
	parameter_2: Joi.string(),
});

export const schemaReqClient: Joi.ObjectSchema<any> = Joi.object({
	client: schemaClient.required(),
});
