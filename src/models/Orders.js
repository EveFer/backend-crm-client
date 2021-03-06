const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ordersSchema = new Schema({
    client: {
        type: Schema.ObjectId,
        ref: 'Clients'
    },
    pedido: [{
        product: {
            type: Schema.ObjectId,
            ref: 'Product'
        },
        amount: Number
    }],
    total: {
        type: Number
    }
})

module.exports = mongoose.model('Orders', ordersSchema)