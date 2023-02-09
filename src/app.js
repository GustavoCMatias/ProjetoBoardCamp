import express from "express";
import cors from "cors"
import gameRouter from "./routes/games.router.js";
import costumerRouter from "./routes/costumers.router.js";




const server = express()
server.use(express.json())
server.use(cors())
server.use([gameRouter, costumerRouter])

server.listen(5000, () =>{
    console.log('deu bom')
})

