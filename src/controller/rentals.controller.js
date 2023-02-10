import dayjs from "dayjs"
import { db } from "../database/database.connection.js"


export async function inserirAluguel(req, res){
    try{
        const {customerId, gameId, daysRented} = req.body
        const {rowCount: rowsCustomer} = await db.query("SELECT * FROM customers WHERE id=$1", [customerId])
        const {rowCount: rowsGames, rows} = await db.query("SELECT * FROM games WHERE id=$1", [gameId])
        if(rowsCustomer === 0 || rowsGames === 0) return res.sendStatus(400)
        console.log(rows)
        const {stockTotal, pricePerDay} = rows[0]
        const {rowCount: gamesRented} = await db.query('SELECT * FROM rentals WHERE "gameId"=$1', [gameId])   
        if(gamesRented>=stockTotal) return res.sendStatus(400)

        const rentDate = dayjs().format('YYYY-MM-DD')
        console.log([customerId, gameId, rentDate, daysRented, null, daysRented, pricePerDay, null])
        await db.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)', [customerId, gameId, rentDate, daysRented, null, daysRented*pricePerDay, null])
        res.sendStatus(201)
    }catch(err){
        res.status(500).send(err.message)
    }
}