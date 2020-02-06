const express = require('express')
const router = express.Router()
const clientController = require('../controllers/clientController')
const productController = require('../controllers/productController')
const orderController = require('../controllers/orderController')
const { subirArchivo } = require('../tools/images')

module.exports = function() {
    // Agrega nuevos clients via post
    router.post('/clients', clientController.newClient)
    // obtener todos los cliente
    router.get('/clients', clientController.getAllClients)
    // obtener un cliente
    router.get('/clients/:id', clientController.getOneClient)
    // actualizar un cliente
    router.put('/clients/:id', clientController.updateClient)
    // eliminar un cliente
    router.delete('/clients/:id', clientController.deleteClient)
    
    // Productos
    router.post('/products', 
        subirArchivo,
        productController.newProduct
    )
    // obtener todos los productos
    router.get('/products', productController.getAllProducts)
    // mostrar todos los products
    router.get('/products/:id', productController.getProduct)
    // actualizar un producto
    router.put('/products/:id', 
        subirArchivo, 
        productController.updateProduct
    )
    // eliminar producto
    router.delete('/products/:id', productController.deleteProduct)

    // ORDERS
    router.post('/orders', orderController.newOrder)
    // mostrar todos los pedidos
    router.get('/orders', orderController.getAllOrders)
    router.get('/orders/:id', orderController.getOrder)
    router.put('/orders/:id', orderController.updateOrder)
    router.delete('/orders/:id', orderController.deleteOrder)
    return router
}