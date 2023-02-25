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


agencyRouter.post('/', isAuthenticatedMiddleware, async (req, res) => {
    //Adicionamos ao payload o id da user que vem do req.user gerado no middleware de autenticação
    const payload = { ...req.body, agency: req.agency.id }

    try {
        const newAgency = await AgencyModel.create(payload)

        //Atualizar o usuario dono do comentario para incluir o id do comentario criado
        //Achar o usuario 
        //Atualizar o usuario
        ////Inserir o id do novo comentario
        await agency.findOneAndUpdate({_id: req.agency.id}, {$push: {agency: newAgency._id }})

        return res.status(201).json(newAgency)      
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