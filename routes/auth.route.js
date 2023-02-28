import { Router } from 'express'
import bcrypt from 'bcryptjs'
import Agency from '../models/Agency.model.js'
import User from '../models/User.model.js'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

const authRouter = Router()

authRouter.post('/sign-up', async (req, res) => {
    const user = req.body

    try {

        if(user.cpf) {

        const userExists = await User.findOne({email: user.email})
        if(userExists) {
            throw new Error('User exists')
        }
    } if(user.cnpj) {
        const agencyExists = await Agency.findOne({email: user.email})
        if(userExists) {
            throw new Error('User exists')
        }

    }
        const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS)
        const passwordHash = bcrypt.hashSync(user.password, salt)
        const userData = {...user, passwordHash}

        if (user.cpf){

            const newUser = await User.create(userData)
            if(newUser) {
                return res.status(201).json({message: 'User Created'})
            }

        }

        const newAgency = await Agency.create(userData)
        if(newAgency) {
            return res.status(201).json({message: 'User Created'})
        }
    } catch (error) {
        console.log(error)

        if(error.message === 'User exists') {
            return res.status(409).json({message: 'Revise os dados enviados'})
        }
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    
    console.log(email, password)

    try {
        if(!email) {
            throw new Error('Empty e-mail')
        }
    
        if(!password) {
            throw new Error('Empty password')
        }

        const user = await User.findOne({email})

        if(!user) {
            throw new Error('User does not exists')
        }

        console.log(user)

        console.log('hash', password, user.passwordHash)

        const passwordMatch = bcrypt.compareSync(password, user.passwordHash)

        if(!passwordMatch) {
            throw new Error('Password does not match')
        }

        const secret = process.env.JWT_SECRET
        const expiresIn = process.env.JWT_EXPIRES

       
        const token = jwt.sign({id: user._id, email: user.email}, secret, {expiresIn})
        
        return res.status(200).json({token})
    } catch (error) {
        console.log(error)
        return res.status(401).json({message: 'Unauthorized'})
    }
})

export default authRouter