import dayjs from "dayjs"
import { db } from "../database/database.connection.js"

export async function inserirAluguel(req, res){
    try{
        const {customerId, gameId, daysRented} = req.body
        const {rowCount: rowsCustomer} = await db.query("SELECT * FROM customers WHERE id=$1", [customerId])
        const {rowCount: rowsGames, rows} = await db.query("SELECT * FROM games WHERE id=$1", [gameId])
        if(rowsCustomer === 0 || rowsGames === 0) return res.sendStatus(400)
        const {stockTotal, pricePerDay} = rows[0]
        const {rowCount: gamesRented} = await db.query('SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL', [gameId])   
        if(gamesRented>=stockTotal) return res.sendStatus(400)

        const rentDate = dayjs().format('YYYY-MM-DD')
        await db.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)', [customerId, gameId, rentDate, daysRented, null, daysRented*pricePerDay, null])
        res.sendStatus(201)
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function listarAlugueis(_, res){
    try{
        const {rows} = await db.query('SELECT r.*, c.id AS cid, c.name AS cname, g.id AS gid, g.name AS gname FROM rentals as r JOIN customers AS c ON c.id = r."customerId" JOIN games AS g ON g.id = r."gameId"')
        res.send(rows.map(item => ({... item, customer:{id: item.cid, name: item.cname}, game:{id: item.gid, name: item.gname}, gname: undefined, gid:undefined, cname: undefined, cid: undefined})))
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function finalizarAluguel(req, res){
    const {id} = req.params
    try{
        const {rows, rowCount} = await db.query('SELECT * FROM rentals WHERE id=$1', [id])
        if(rowCount === 0)return res.sendStatus(404)
        if(rows[0].returnDate)return res.sendStatus(400)

        const returnDate = dayjs().format('YYYY-MM-DD')
        const daysDiff = dayjs().diff(rows[0].rentDate, 'd')
        const delayFee = daysDiff<=rows[0].daysRented?0:(daysDiff-rows[0].daysRented)*rows[0].originalPrice/rows[0].daysRented

        await db.query('UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3', [returnDate, delayFee, id])
        res.send()
    }catch(err){
        res.status(500).send(err.message)
    }
    
    
}

export async function apagarAluguel(req, res){
    const {id} = req.params
    try{
        const {rows, rowCount} = await db.query('SELECT * FROM rentals WHERE id=$1', [id])
        if(rowCount === 0 )return res.sendStatus(404)
        if(rows[0].returnDate) return res.sendStatus(400)
        await db.query('DELETE FROM rentals WHERE id=$1', [id])
        res.send()
    }catch(err){
        res.status(500).send(err.message)
    }
}