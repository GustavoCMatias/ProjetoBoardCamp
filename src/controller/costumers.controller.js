import { db } from "../database/database.connection.js"


export async function inserirClientes(req, res){
    const {name, phone, cpf, birthday} = req.body
    try{
        const{rowCount} = await db.query('SELECT cpf FROM customers WHERE cpf = $1', [cpf])
        if(rowCount !== 0)return res.sendStatus(409) 

        await db.query('INSERT INTO customers (name,phone,"cpf","birthday") VALUES ($1, $2, $3, $4)', [name, phone, cpf, birthday])
        res.sendStatus(201)
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function listarClientes(req, res){
    const {id} = req.params
    try{
        if (id){
            const {rowCount, rows} = await db.query("SELECT * FROM customers WHERE id=$1", [id]) 
            if (rowCount === 0) return res.sendStatus(404)
            res.send(rows)
        }else{
            const {rows} = await db.query("SELECT * FROM customers") 
            res.send(rows)      
        }
        
    }catch(err){
        res.status(500).send(err.message)
    }
}