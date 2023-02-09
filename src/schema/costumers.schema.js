import Joi from "joi"
import JoiDate from '@joi/date';

const joi = Joi.extend(JoiDate)
export const costumerSchema = joi.object({
    name: joi.string().min(2).required(),
    phone: joi.string().min(10).max(11).pattern(/^[0-9]+$/).required(),
    cpf: joi.string().length(11).pattern(/^[0-9]+$/).required(),
    birthday: joi.date().format("YYYY-MM-DD").required()
})