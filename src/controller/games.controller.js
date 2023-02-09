import joi from "joi"
import { db } from "../database/database.connection.js"
import { gameSchema } from "../schema/games.schema.js"


export async function inserirJogos(req, res){
    const {name, image, stockTotal, pricePerDay} = req.body
    try{
        const {rowCount} = await db.query('SELECT name FROM games WHERE name=$1', [name])
        if(rowCount !== 0)return res.sendStatus(409)

        await db.query('INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUES ($1, $2, $3, $4)', [name, image, stockTotal, pricePerDay])
        res.sendStatus(201)
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function listarJogos(_, res){
    try{
        const {rows} = await db.query('SELECT * FROM games')
        res.send(rows)
    }catch(err){
        res.status(500).send(err.message)
    }
}