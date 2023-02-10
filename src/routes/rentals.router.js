import { Router } from "express";
import { inserirAluguel, listarAlugueis } from "../controller/rentals.controller.js";
import { validarSchema } from "../middleware/validateSchema.midleware.js";
import { rentalSchema } from "../schema/rentals.schema.js";


const rentalRouter = Router()

rentalRouter.post("/rentals", validarSchema(rentalSchema), inserirAluguel)
rentalRouter.get("/rentals", listarAlugueis)
export default rentalRouter