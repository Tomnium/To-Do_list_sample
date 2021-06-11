const validate = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body.text)
    error ? res.status(400).send({ error: 'Invalid item' }) : next()
}

module.exports ={
    validate
}