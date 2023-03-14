import { Router } from 'express'
import AgencyModel from '../models/Agency.model.js'
import isAuthenticatedMiddleware from '../middlewares/isAuthenticatedMiddleware.js'

const agencyRouter = Router()

agencyRouter.get('/', isAuthenticatedMiddleware, async (req, res) => {
    try {
        const todos = await AgencyModel.find({agency: req.agency.id})
        return res.status(200).json(AgencyModel)      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

agencyRouter.get('/:id', async (req, res) => {
    const {id} = req.params

    try {
        const agencyId = await AgencyModel.findById(id)
        return res.status(200).json(agencyId)      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})


agencyRouter.put('/:id', isAuthenticatedMiddleware, async (req, res) => {
    const { id } = req.params
    const payload = req.body
    try {
        const updatedAgency = await agency.findOneAndUpdate(
            {_id: id, agency: req.agency.id}, 
            payload, 
            { new: true }
        )
        return res.status(200).json(updatedAgency)      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

agencyRouter.delete('/:id', isAuthenticatedMiddleware, async (req, res) => {
    const { id } = req.params
    try {
        await agency.findOneAndDelete({_id: id, agency: req.agency.id})
        return res.status(204).json()      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

export default agencyRouter