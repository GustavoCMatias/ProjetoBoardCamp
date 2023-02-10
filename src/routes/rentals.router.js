import { Router } from "express";
import { apagarAluguel, finalizarAluguel, inserirAluguel, listarAlugueis } from "../controller/rentals.controller.js";
import { validarSchema } from "../middleware/validateSchema.midleware.js";
import { rentalSchema } from "../schema/rentals.schema.js";


const rentalRouter = Router()

rentalRouter.post("/rentals", validarSchema(rentalSchema), inserirAluguel)
rentalRouter.get("/rentals", listarAlugueis)
rentalRouter.post("/rentals/:id/return", finalizarAluguel)
rentalRouter.delete("/rentals/:id", apagarAluguel)
export default rentalRouter