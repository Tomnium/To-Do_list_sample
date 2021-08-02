
const validateMiddleware = (schema, property) => (req, res, next) => {
    const { error } = schema.validate(req[property])

    const valid = error == null

    if(valid){ 
        next()
    } else { 
        const { details } = error
        res.status(422).json({error: details})
    }
}

module.exports ={
    validateMiddleware
}

