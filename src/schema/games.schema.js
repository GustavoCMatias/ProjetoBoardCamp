import joi from "joi";


export const gameSchema = joi.object({
    name: joi.string().min(2).required(),
    image: joi.string().required(),
    stockTotal: joi.number().min(0).invalid(0).required(),
    pricePerDay: joi.number().min(0).invalid(0).required()
})

