import { Router } from 'express'
import UserModel from '../models/User.model.js'
import fileUpload from '../config/cloudinary.config.js'
import isAuthenticatedMiddleware from '../middlewares/isAuthenticatedMiddleware.js'

const userRouter = Router()

userRouter.get('/', isAuthenticatedMiddleware, async (req, res) => {
    try {
        const userData = await UserModel.find({user: req.user.id})
        return res.status(200).json(userData)      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

userRouter.put('/:id', isAuthenticatedMiddleware, async (req, res) => {
    const { id } = req.params
    const payload = req.body
    try {
        const updatedUser = await UserModel.findOneAndUpdate(
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
        await UserModel.findOneAndDelete({_id: id, user: req.user.id})
        return res.status(204).json("User delete")      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})


userRouter.post("/upload", isAuthenticatedMiddleware, fileUpload.single('pictureUser'), (req, res) => {
    res.status(201).json({url: req.file.path})
})

export default userRouter