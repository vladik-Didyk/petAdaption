const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  Type: {type : String, required: true, unique: false}, 
  Name: {type : String, required: true, unique: false}, 
  Adoption_Status :{
    isAdoption: { type : Boolean,  required: true, unique: false},
    isReturned: {type: Boolean,  required: true, unique: false},
  },
  Picture: {any: Object},
  Height: {type: Number, required: false, unique: false}, 
  Weight: {type : Number, required: false, unique: false}, 
  Color: {type : String, required: false, unique: false}, 
  Bio: {type : String, required: false, unique: false}, 
  Hypoallergenic: {type : Boolean, required: false, unique: false}, 
  dietary_restrictions: {type : String, required: false, unique: false}, 
  breed_of_animal: {type : String, required: false, unique: false}, 
})
module.exports = model('Pet', schema)