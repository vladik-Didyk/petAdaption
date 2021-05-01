const { Router } = require('express')
const router = Router()
const Pet = require('../modules/Pet')
const { check, validationResult } = require('express-validator')



router.post('/PetConfiguration',

async (req, res)=>{
try{
  const reqPet = req.body
  const newPet = await Pet.findOne({reqPet})
  if(newPet) return res.status(400).json({message : 'This pet is already exists'})

console.log(reqPet.Picture);
console.log(reqPet);
  //if(!reqPet.Type) return res.status(400).json({message : 'You did not mention the type '})

  const pet = new Pet(reqPet)

//  console.log(pet);

 // await pet.save()

  res.status(200).json({message: ' Created'})

} catch(e){
  res.status(505).json({ message: 'Errors' })
}
  
//   if (!checkErrorValidation.isEmpty()) return res.status(888).json({
//     errors: checkErrorValidation.array(),
//     message: 'Error in validation'
// })




})
// router.get( '/all_Pet_details',

//   async (req, res)=>{
//     try{
    
//     let num = 0
// Pet.find({}, (err,result)=>{
//   if(err){
//     console.log('error'. err);
//   } else {
  
   
//     res.json(result)
//   }
// })
//      // res.status(200).json({message: ' Created'})
    
//     } catch(e){
    
//     }
//   })


module.exports = router