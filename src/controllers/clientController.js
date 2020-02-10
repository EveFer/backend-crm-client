const Client = require('../models/Clients')

// agregar un nuevo cliente
exports.newClient = async (req, res, next) => {
    const client = new Client(req.body)
    try {
        // almacenar registro
        await client.save()
        res.json({message: 'Se agrego correctamente el cliente', client})
    } catch (error) {
        res.status(400).json(error)
        next()
    }
}

exports.getAllClients = async (req, res, next) => {
    try {
        const clients = await Client.find({})
        res.json(clients)
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.getOneClient = async (req, res, next) => {
    try {
        const client = await Client.findById(req.params.id)
        if(!client) {
            res.json({message: 'El client no existe'})
            next()
        }
        res.json(client)
    } catch (error) {
        console.log(error)
    }
}

exports.updateClient = async (req, res, next) => {
    try {
        const client = await Client.findOneAndUpdate(
            {_id: req.params.id}, 
            req.body, 
            { new: true}
        )
        res.json(client)
    } catch (error) {
        res.status(400).json(error)
        next()
    }
}

exports.deleteClient = async (req, res, next) => {
    try {
        await Client.findOneAndDelete({_id: req.params.id})
        res.json({message: 'El cliente se ah eliminado'})
    } catch (error) {
        res.status(400).json(error)
        next()
    }
}