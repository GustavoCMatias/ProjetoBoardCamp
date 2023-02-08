import express from "express";
import cors from "cors"




const server = express()
server.use(express.json())
server.use(cors())
server.use()

server.listen(5000, () =>{
    console.log('deu bom')
})

