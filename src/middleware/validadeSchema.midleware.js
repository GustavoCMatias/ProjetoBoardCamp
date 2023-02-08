export function validateSchema(schema){
    return (res, req, next) =>{
        const {error} = schema.validate(req.body, {abortEarly: false})
        if (error){
            return res.status(422).send(error.details.map(each => each.message))
        }
        next()
    }
}