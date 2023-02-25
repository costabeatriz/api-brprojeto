import { Router } from 'express'
import UserModel from '../models/User.model.js'
import isAuthenticatedMiddleware from '../middlewares/isAuthenticatedMiddleware.js'

const userRouter = Router()

userRouter.get('/', isAuthenticatedMiddleware, async (req, res) => {
    try {
        const exchange = await UserModel.find({user: req.user.id})
        return res.status(200).json(userRouter)      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})


userRouter.post('/', isAuthenticatedMiddleware, async (req, res) => {
    //Adicionamos ao payload o id do usuario que vem do req.user gerado no middleware de autenticação
    const payload = { ...req.body, user: req.user.id }

    try {
        const newUser = await UserModel.create(payload)

        //Atualizar o user vinculado com todos os e-mails ele possa ter
        await user.findOneAndUpdate({_id: req.user.id}, {$push: {user: newUser._id }})

        return res.status(201).json(newUser)      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

userRouter.put('/:id', isAuthenticatedMiddleware, async (req, res) => {
    const { id } = req.params
    const payload = req.body
    try {
        const updatedUser = await user.findOneAndUpdate(
            {_id: id, user: req.user.id}, 
            payload, 
            { new: true }
        )
        return res.status(200).json(updatedUser)      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

exchangeRouter.delete('/:id', isAuthenticatedMiddleware, async (req, res) => {
    const { id } = req.params
    try {
        await exchange.findOneAndDelete({_id: id, user: req.user.id})
        return res.status(204).json()      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

export default userRouter