import { Router } from "express";
import { inserirJogos, listarJogos } from "../controller/games.controller.js";
import { validarSchema } from "../middleware/validateSchema.midleware.js";
import { gameSchema } from "../schema/games.schema.js";


const gameRouter = Router()

gameRouter.post("/games", validarSchema(gameSchema), inserirJogos)
gameRouter.get("/games", listarJogos)

export default gameRouter