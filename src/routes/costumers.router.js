import { Router } from "express"
import { atualizarClientes, inserirClientes, listarClientes } from "../controller/costumers.controller.js"
import { validarSchema } from "../middleware/validateSchema.midleware.js"
import { costumerSchema } from "../schema/costumers.schema.js"


const costumerRouter = Router()

costumerRouter.post("/customers", validarSchema(costumerSchema), inserirClientes)
costumerRouter.get("/customers", listarClientes)
costumerRouter.get("/customers/:id", listarClientes)
costumerRouter.put("/customers/:id", validarSchema(costumerSchema), atualizarClientes)

export default costumerRouter