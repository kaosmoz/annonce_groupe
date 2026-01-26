import Joi from "joi";

export const annonceSchema = Joi.object({
  title: Joi.string().required().min(3),
  price: Joi.number().positive().precision(2).required(),
  city: Joi.string().required(),
  category_id: Joi.number().required()
}) ;
