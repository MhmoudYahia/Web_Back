import Joi from 'joi';

export const createTicketSchema = Joi.object({
  matchId: Joi.number().integer().positive().required(),
  seatNo: Joi.string().required(),
});
