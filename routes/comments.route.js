import { Router } from 'express'
import CommentsModel from '../models/Comments.model.js'
import isAuthenticatedMiddleware from '../middlewares/isAuthenticatedMiddleware.js'

const commentsRouter = Router()

commentsRouter.get('/', isAuthenticatedMiddleware, async (req, res) => {
    try {
        const todos = await ExchangeModel.find({user: req.user.id})
        return res.status(200).json(CommentsModel)      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})


commentsRouter.post('/', isAuthenticatedMiddleware, async (req, res) => {
    //Adicionamos ao payload o id da user que vem do req.user gerado no middleware de autenticação
    const payload = { ...req.body, user: req.user.id }

    try {
        const newComment = await CommentsModel.create(payload)

        //Atualizar o usuario dono do comentario para incluir o id do comentario criado
        //Achar o usuario 
        //Atualizar o usuario
        ////Inserir o id do novo comentario
        await user.findOneAndUpdate({_id: req.user.id}, {$push: {comment: newComment._id }})

        return res.status(201).json(newComment)      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

commentsRouter.put('/:id', isAuthenticatedMiddleware, async (req, res) => {
    const { id } = req.params
    const payload = req.body
    try {
        const updatedComment = await comment.findOneAndUpdate(
            {_id: id, user: req.user.id}, 
            payload, 
            { new: true }
        )
        return res.status(200).json(updatedComment)      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

commentsRouter.delete('/:id', isAuthenticatedMiddleware, async (req, res) => {
    const { id } = req.params
    try {
        await comments.findOneAndDelete({_id: id, user: req.user.id})
        return res.status(204).json()      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

export default commentsRouter