const Product = require('../models/Products')
const {deleteFile} = require('../tools/images')


exports.newProduct = async (req, res, next) => {
    const product = new Product(req.body)
    try {
        if(req.file) {
            product.image = req.file.filename
        }
        await product.save()
        res.json(product)
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product) {
            res.json({message: 'No se encuentra en producto'})
            return next()
        }
        res.json(product)
    } catch (error) {
        console.log(error)
        next()
    }
}
exports.updateProduct = async (req, res, next) => {
    try {
        let productAnterior = await Product.findById(req.params.id)
        // construir un nuevo producto
        let nuevoProducto = req.body
        // verificar si hay nueva imagen
        if(req.file) {
            nuevoProducto.image = req.file.filename
            if (productAnterior.image) {
                deleteFile(productAnterior.image)
            }
        }else {
            nuevoProducto.image = productAnterior.image
        }

        let product = await Product.findOneAndUpdate(
            {_id: req.params.id},
            nuevoProducto,
            {new: true}
        )
        res.json(product)
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {

        Product.findById({_id: req.params.id}, function(err, data) {
            if (err) throw err
            if (data.image) {
                deleteFile(data.image)
            }
        }) 
        await Product.findOneAndDelete({_id: req.params.id})
        res.json({message: 'El producto se ha eliminado correctamente'})
    } catch (error) {
        res.status(400).json(error)
        next()
    }
}

