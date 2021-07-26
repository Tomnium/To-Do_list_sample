const tokenService = require('../services/jwt');

const auth = (req, res, next) => {
    try{
        const token = req.header("x-auth-token");

        // console.log(JSON.stringify(req.headers))
        if (!token){ 
            res.status(403).json("Access denied.");  
        }
        
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        next();
    } catch{
        res.status(400).json({ error: 'Invalid token' });
    }
}

module.exports ={
    auth
}
