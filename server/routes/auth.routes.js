const { Router } = require('express')
const User = require('../modules/User')
const router = Router()
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')


router.post('/SignIn',
    [
        check('email', 'You wrote your email incorrect').isEmail(),
        check('password', 'Your password have to be at least 6 symbols').isLength({ min: 6 })
    ]
    , async (req, res) => {
        const checkErrorValidation = validationResult(req.body)
        if (!checkErrorValidation.isEmpty()) return res.status(888).json({
            errors: checkErrorValidation.array(),
            message: 'Error in validation'
        })

        try {
            const {
                email,
                password,
                name,
                lastName,
                phoneNumber,
            } = req.body

            const candidateEmail = await User.findOne({ email })

            if (candidateEmail) {
                return res.status(400)
                    .json({ name: 'This email already excite' })
            }

            const hasPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email,
                password: hasPassword,
                name,
                lastName,
                phoneNumber,
                pets: [],
                isAdmin: false,
            })
            await user.save()
            res.status(201).json({ message: 'Congrats - you are signed up!' })
        } catch (e) {
            res.status(505).json({ message: 'Errors' })
        }
    })

let usersToken = []

router.post('/authorization', async (req, res) => {
const {_id, token} = req.body;


    const getToken =  usersToken.find(userTok => userTok === token)
    if(!getToken.length) return res.status(402).json({message : 'Error'})

    const user = await User.findOne({ _id })
    if(!user) return res.status(403).json({message : 'User not found '})

    const { lastName, name, phoneNumber, isAdmin}  = user
    res.json({
        lastName ,
        name ,
        phoneNumber ,
        isAdmin 
    })

})

router.post('/LogIn',
    [
        check('email', 'You wrote your email incorrect').normalizeEmail().isEmail(),
        check('password', 'Your password have to be at least 6 symbols').exists()
    ],

    async (req, res) => {

        try {
            // console.log(!validationResult(req.body).isEmpty());
            if (!validationResult(req.body).isEmpty()) return res.status(888).json({
                errors: validationResult(req).array(),
                message: 'Error in loggin',
            })

            const { email, password } = req.body

            const candidateEmail = await User.findOne({ email })
         
            if (!candidateEmail) return res.status(400).json({ message: 'I do not find email like this in my backend... ' })

            const hasPassword = await bcrypt.compare(password, candidateEmail.password)
          
    
            if (!hasPassword) return res.status(501).json({ message: 'Password do not comare...' })

            const token = jwt.sign(
                { userId: candidateEmail.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )
        
            usersToken.push(token)
            setTimeout(()=>{
            usersToken = usersToken.filter(tokenFiltered => tokenFiltered !== token)
            },3600000)

            res.status(200)
            .json({
                token, 
                userId: candidateEmail.id, 
                message: 'Login succseful', 
                user : {
                    lastName : candidateEmail.lastName,
                    name : candidateEmail.name,
                    phoneNumber : candidateEmail.phoneNumber,
                    admin : candidateEmail.isAdmin,

                }
            })
        } catch {
            res.status(501).json('error')
            //console.log(!validationResult(req.body).isEmpty());
        }

    })

module.exports = router