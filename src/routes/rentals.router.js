import { Router } from "express";
import { finalizarAluguel, inserirAluguel, listarAlugueis } from "../controller/rentals.controller.js";
import { validarSchema } from "../middleware/validateSchema.midleware.js";
import { rentalSchema } from "../schema/rentals.schema.js";


const rentalRouter = Router()

rentalRouter.post("/rentals", validarSchema(rentalSchema), inserirAluguel)
rentalRouter.get("/rentals", listarAlugueis)
rentalRouter.post("/rentals/:id/return", finalizarAluguel)
export default rentalRouter