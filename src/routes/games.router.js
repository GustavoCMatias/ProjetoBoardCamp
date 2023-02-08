import { Router } from "express";
import { inserirJogos } from "../controller/games.controller.js";
import { validateSchema } from "../middleware/validadeSchema.midleware.js";
import { gameSchema } from "../schema/games.model.js";


const router = Router()

router.post("/games", validateSchema(gameSchema), inserirJogos)


export default router