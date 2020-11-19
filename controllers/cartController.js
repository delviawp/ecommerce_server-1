const { Cart, User, Product } = require('../models')

class CartController {
    static addCart(req, res, next) {
        const { ProductId } = +req.params
        console.log(ProductId, '<<<< ada gak')

        Cart.findOne({
            where: {
                ProductId, UserId: req.loggedInUser.id
            }, 
            include: { model: Product}
        })
        .then(cart => {
            if(cart) {
                if(cart.Product.stock <= cart.quantity) {
                    throw {msg: "It's over the stock"}
                } else {
                    cart.quantity += 1
                    return cart.save()
                }
            } else {
                return Cart.create({
                    ProductId: ProductId,
                    UserId: req.loggedInUser.id
                })
            }
        })
        .then(cart => {
            res.status(201).json({
                id: cart.id,
                ProductId: cart.ProductId,
                UserId: cart.UserId,
                quantity: cart.quantity,
                status: cart.status
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
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
}

module.exports = CartController