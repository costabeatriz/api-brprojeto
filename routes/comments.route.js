import { Router } from 'express'
import Comments from '../models/Comments.model.js'
import isAuthenticatedMiddleware from '../middlewares/isAuthenticatedMiddleware.js'

const commentsRouter = Router()

commentsRouter.get('/', async (req, res) => {
    try {
        const allComments = await Comments.find()
        return res.status(200).json(allComments)      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})


commentsRouter.post('/', isAuthenticatedMiddleware , async (req, res) => {
    const payload = req.body
    const userId = req.user.id

    try {
        const newComment = await Comments.create({...payload, user: userId})

        return res.status(201).json(newComment)      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

commentsRouter.put('/:id', isAuthenticatedMiddleware, async (req, res) => {
    const { id } = req.params
    const payload = req.body
    const userId = req.user.id
    
    try {
        const updatedComment = await Comments.findOneAndUpdate(
            {_id: id, user: userId}, 
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
        await comments.findOneAndDelete(            
            {_id: id, comments: req.comments.id}, 
            payload, 
            { new: true })
        return res.status(204).json()      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

export default commentsRouter