const {Schema, model} = require('mongoose')

const Role = new Schema({
    value: {type: String, unique: true, default: 'USER'} //keep user admin and other roles
})

module.exports = model('Role', Role) //Role schema