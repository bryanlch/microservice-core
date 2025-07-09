import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3030),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  JWT_SECRET_KEY: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.string().required(),
  // Database configuration
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(3306),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),

});
