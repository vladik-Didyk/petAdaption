const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type : String, required: true, unique: true}, 
    password: {type : String, required: true}, 
    links : [{type: Types.ObjectId, ref: "Link"}],
    name: {type : String, required: true, unique: false}, 
    lastName: {type : String, required: true, unique: false}, 
    phoneNumber: {type: String, unique: false}, 
    isAdmin: {type : Boolean, required: false, unique: false}, 
    pets: {type : Array, required: false, unique: false}, 
    })
module.exports = model('User', schema)
