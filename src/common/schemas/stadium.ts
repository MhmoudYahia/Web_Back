import Joi from 'joi';

export const createStadiumSchema = Joi.object({
  name: Joi.string().required(),
  capacity: Joi.number().required().min(1000),
  location: Joi.string().required(),
  vipRows: Joi.number().required(),
  seatsPerRow: Joi.number().required()
});