import { Router } from 'express'
import ExchangeModel from '../models/Exchange.model.js'
import isAuthenticatedMiddleware from '../middlewares/isAuthenticatedMiddleware.js'

const exchangeRouter = Router()

exchangeRouter.get('/', isAuthenticatedMiddleware, async (req, res) => {
    try {
        const exchange = await ExchangeModel.find({agency: req.agency.id})
        return res.status(200).json(ExchangeModel)      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})


exchangeRouter.post('/', isAuthenticatedMiddleware, async (req, res) => {
    //Adicionamos ao payload o id da agency que vem do req.agency gerado no middleware de autenticação
    const payload = { ...req.body, agency: req.agency.id }

    try {
        const newExchange = await ExchangeModel.create(payload)

        //Atualizar a agencia dona do intercambio para incluir o id do intercambio criado
        //Achar a agencia 
        //Atualizar a agencia
        ////Inserir o id do novo intercambio
        await agency.findOneAndUpdate({_id: req.agency.id}, {$push: {exchange: newExchange._id }})

        return res.status(201).json(newExchange)      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

exchangeRouter.put('/:id', isAuthenticatedMiddleware, async (req, res) => {
    const { id } = req.params
    const payload = req.body
    try {
        const updatedExchange = await exchange.findOneAndUpdate(
            {_id: id, agency: req.agency.id}, 
            payload, 
            { new: true }
        )
        return res.status(200).json(updatedExchange)      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

exchangeRouter.delete('/:id', isAuthenticatedMiddleware, async (req, res) => {
    const { id } = req.params
    try {
        await exchange.findOneAndDelete({_id: id, agency: req.agency.id})
        return res.status(204).json()      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

export default exchangeRouter