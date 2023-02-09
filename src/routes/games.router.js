import { Router } from "express";
import { inserirJogos } from "../controller/games.controller.js";
import { validarSchema } from "../middleware/validateSchema.midleware.js";
import { gameSchema } from "../schema/games.schema.js";


const router = Router()

router.post("/games", validarSchema(gameSchema), inserirJogos)


export default router