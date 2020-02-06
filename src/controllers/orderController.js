const Order = require('../models/Orders')

exports.newOrder = async (req, res, next) => {
    const pedido = new Order(req.body)
    try {
        await pedido.save()
        res.json(pedido)
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({}).populate('client').populate({
            path:'pedido.product', 
            model: 'Product'
        });
        res.json(orders)
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.getOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('client').populate({
        path:'pedido.product', 
        model: 'Product'
    });
    if(!order){
        res.json({message: 'El pedido no existe'})
        return next() // para que no se ejecute la siguiente linea
    }
    // mostrar pedido
    res.json(order)
}

exports.updateOrder = async (req, res, next) => {
    try {
        let pedido = await Order.findOneAndUpdate(
            {_id: req.params.id}, 
            req.body,
            {new: true}
        )
        .populate('client')
        .populate({
            path:'pedido.product', 
            model: 'Product'
        });
        res.json(pedido)
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.deleteOrder = async (req, res, next) => {
    try {
        await Order.findOneAndDelete({_id: req.params.id})
        res.json({message: 'EL pedido se ha elimidado'})
    } catch (error) {
        console.log(error)
        next()
    }
}