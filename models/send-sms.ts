import Joi from 'joi';
import { ISendSMS, IGetSendSmsClients } from '@/globaltypes/types';

export const schemaSendSMS: Joi.ObjectSchema<ISendSMS> = Joi.object({
	userName: Joi.string().required().messages({
		"string.pattern.base":
			'Enter user name, piease.',
	}),
	date: Joi.string().allow('').messages({
		"string.pattern.base":
			'Choose date, piease.',
	}),
	time: Joi.string().allow('').messages({
		"string.pattern.base":
			'Choose time, piease.',
	}),
	contentSMS: Joi.string().required().messages({
		"string.pattern.base":
			'Enter text sms, piease.',
	}),
	recipients: Joi.array().items(Joi.string(), Joi.number()).required().messages({
		"string.pattern.base":
			'Enter recipients, piease.',
	}),
	send_method: Joi.string().valid('api', 'web').required(),
});

export const schemaGetQuantitySendSMSRecipients: Joi.ObjectSchema<IGetSendSmsClients> = Joi.object({
	recipients: Joi.array().items(Joi.string(), Joi.number()).required().messages({
		"string.pattern.base":
			'Enter recipients, piease.',
	}),
});
