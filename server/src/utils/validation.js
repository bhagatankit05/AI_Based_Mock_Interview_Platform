import Joi from 'joi';

export const validateInterviewData = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    position: Joi.string().required(),
    experience: Joi.string().required(),
    skills: Joi.array().items(Joi.string()).required(),
    interviewType: Joi.string().valid('technical', 'behavioral', 'mixed').default('mixed'),
    difficulty: Joi.string().valid('easy', 'medium', 'hard').default('medium'),
  });

  return schema.validate(data);
};

export const validateUserData = (data, isUpdate = false) => {
  const schema = Joi.object({
    name: isUpdate ? Joi.string().optional() : Joi.string().required(),
    email: isUpdate ? Joi.string().email().optional() : Joi.string().email().required(),
    experience: Joi.string().optional(),
    skills: Joi.array().items(Joi.string()).optional(),
    bio: Joi.string().max(500).optional(),
  });

  return schema.validate(data);
};