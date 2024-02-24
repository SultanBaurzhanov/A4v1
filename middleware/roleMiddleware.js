const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function (roles) { //allowed roles
    return function (req, res, next) {
        if(req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] //need token, not its type, so take 2nd part
            if (!token) {
                return res.status(403).json({message:'User not registered'})
            }
            const {roles: userRoles} = jwt.verify(token, secret)   //from token gets the roles
            let hasRole = false //check if the roles list has roles of the logged User
            userRoles.forEach(role => {
                if(roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({message:'You dont have access to this'})
            }
            next()
        } catch (error) {
            console.log(error)
            return res.status(403).json({message:'User not logged in'})
        }
    }
}