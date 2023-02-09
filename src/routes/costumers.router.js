import { Router } from "express"
import { inserirClientes } from "../controller/costumers.controller.js"
import { validarSchema } from "../middleware/validateSchema.midleware.js"
import { costumerSchema } from "../schema/costumers.schema.js"


const costumerRouter = Router()

costumerRouter.post("/customers", validarSchema(costumerSchema), inserirClientes)

export default costumerRouter