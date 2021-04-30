const express = require('express')
const config = require('config')
const app = express()
const mongoose = require('mongoose')

const PORT = config.get('port') || 5000
app.use(express.json(
    {extended :true}
))

app.use('/api/auth', require('./routes/auth.routes'))
//app.use('/api/created', require('./routes/pets.routes'))




async function start (){
    try {
        //await mongoose.set('mongoURL', true); 
        
        await mongoose.connect(config.get('mongoURL'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
            
            )
            
           await console.log('try');
        app.listen(PORT, ()=>{
            console.log('new User');
        })
    } catch {
        console.log('s');
        process.exit(1)
    }
}
start()


    // console.log(config.get('mongoURL1'));
    
    
    