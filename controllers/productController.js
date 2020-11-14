const { Product } = require('../models')

class ProductController {
    static async getAll(req, res, next) {
        try {
            let products = await Product.findAll()
            res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        //console.log(req.body, '<< ni req body create')
        try {
            const { name, image_url, price, stock } = req.body
            //console.log(req.body)
            const product = await Product.create({ name, image_url, price, stock})
            //console.log(product, 'ini product')
            res.status(201).json(product)
        } catch (error) {
            console.log(error, "in ierror controller")
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            let { name , image_url, price, stock } = req.body
            let id = req.params.id
            let obj = {
                name, image_url, price, stock
            } 
            let product = await Product.findOne({ where : { id }})
            if (!product) {
                next({
                    status: 404,
                    message: 'Product not found'
                })
            } else {
                let edit = await Product.update(obj, { where: {id} })
                if (edit) {
                    res.status(200).json({edit: obj, message: 'Product edited'})
                }
            }
        } catch (error) {
            console.log(error, 'waktu edit')
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            let product = await Product.findByPk(req.params.id)

            if(product) {
                await product.destroy()
                await product.save()
                res.status(200).json({message: 'product has been deleted'})
            } else {
                throw {msg: 'product not found', status: 404}
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController