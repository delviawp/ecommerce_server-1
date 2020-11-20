const { where } = require('sequelize/types')
const { Cart, User, Product } = require('../models')

class CartController {
    static async addCart(req, res, next) {
        const { ProductId } = req.body
        const UserId = req.loggedInUser

        try {
            const payload = {
                ProductId, UserId, quantity: 1, status: false
            }
            const cart = await Cart.findOne({
                where: {
                    ProductId, UserId, status: false
                }
            })
            if(!cart) {
                const newCart = await Cart.create(payload)
                res.status(201).json(newCart)
            } else {
                const updateCart = await Cart.update({
                    quantity: cart.quantity + 1
                },
                {
                    where: {
                        ProductId, UserId, status: false
                    }, 
                    returning: true
                })
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async updateCart(req,res) {
        try {
            const { quantity } = req.body
            const { id } = req.params
            const obj = {
                quantity
            }
            let cart = await Cart.update(obj, {
                where: {
                    id
                }
            })
            res.status(200).json({cart})
        } catch (error) {
            console.log(error)
        }
    }

    static async delete(req,res) {
        try {
            const {id} = req.params
            await Cart.destroy({ where: {id}})
            res.status(200).json({message: 'Cart has been deleted'})
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getCart (req, res, next) {
        const UserId = req.loggedInUser

        try {
            const carts = await Cart.findAll({ where: { UserId }, include: ['Product'], order: [['createdAt','ASC']] })
            res.status(200).json(carts)
        } catch(err) {
            next(err)
        }
    }

    static async deleteCart (req, res, next) {
        const { id } = req.params

        try {
            const deletedCart = await Cart.destroy({ where: { id } })
            res.status(200).json(deletedCart)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = CartController