import { Router } from 'express'
import UserModel from '../models/User.model.js'
import fileUpload from '../config/cloudinary.config.js'
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


userRouter.post('/', async (req, res) => {
    //Adicionamos ao payload o id do usuario que vem do req.user gerado no middleware de autenticação
    const payload = { ...req.body}

    try {
        const newUser = await UserModel.create(payload)

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

userRouter.delete('/:id', isAuthenticatedMiddleware, async (req, res) => {
    const { id } = req.params
    try {
        await user.findOneAndDelete({_id: id, user: req.user.id})
        return res.status(204).json()      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})


userRouter.post("/upload", isAuthenticatedMiddleware, fileUpload.single('pictureUser'), (req, res) => {
    res.status(201).json({url: req.file.path})
})

export default userRouter