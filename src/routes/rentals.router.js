import { Router } from "express";
import { inserirAluguel } from "../controller/rentals.controller.js";
import { validarSchema } from "../middleware/validateSchema.midleware.js";
import { rentalSchema } from "../schema/rentals.schema.js";


const rentalRouter = Router()

rentalRouter.post("/rentals", validarSchema(rentalSchema), inserirAluguel)

export default rentalRouter