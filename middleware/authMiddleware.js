const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function (req, res, next) { //gives access to reg users
    if(req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] //need token, not its type, so take 2nd part
        if (!token) {
            return res.status(403).json({message:'User not registered'})
        }
        const decodedData = jwt.verify(token, secret)       //if token exists (payload)
        req.user = decodedData
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({message:'User not logged in'})
    }
}