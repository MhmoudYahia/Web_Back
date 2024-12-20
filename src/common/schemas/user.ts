import { Gender, Role } from '@prisma/client';
import Joi from 'joi';

export const updateProfileSchema = Joi.object({
  firstName: Joi.string().min(2).max(50),
  lastName: Joi.string().min(2).max(50),
  birthDate: Joi.date().less('now'),
  gender: Joi.string().valid(...Object.values(Gender)),
  city: Joi.string().min(2).max(100),
  address: Joi.string().min(5).max(200).allow(null),
  email: Joi.string().email(),
});

export const approvalSchema = Joi.object({
    role: Joi.string()
      .valid(...Object.values(Role))
      .required()
  });