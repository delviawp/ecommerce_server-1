const app = require('../app')
const request = require('supertest')
const { User, Product } = require('../models')
const { signToken } = require('../helpers/jwt')
const product = require('../models/product')

let accessToken = ''
let userToken = ''
let productId = 0

beforeAll(async done => {
    try {
        const user_admin = await User.create({
            email: 'admin@mail.com',
            password: "1234",
            role: "admin"
        })
        const token = signToken({ id: user_admin.id, email: user_admin.email, role: user_admin.role})
        accessToken = token
        //console.log(accessToken, 'ini access token')
        done()
    } catch (error) {
        done(error)
    }
})

afterAll(function(done) {
    if(process.env.NODE_ENV == 'test') {
        Product.destroy({ truncate: true })
        .then(_=> {
            return User.destroy({ truncate: true })
        })
        .then(_=> {
            done()
        })
        .catch(err => {
           done(err) 
        })
    }
})


let dataProduct = {
    name: 'jengkol',
    image_url: 'www.google.com',
    price: 5000,
    stock: 5
}

//console.log(dataProduct)

describe('test get all product success', () => {
    test('Object with return keys: name, image_url, price stock and status 200', (done) => {
        request(app)
        .get('/products')
        .set('token', accessToken)
        .end(function (err, res) {
            if(err) throw err
            else {
                expect(res.status).toBe(200)
                expect(res).toHaveProperty("body", expect.any(Object))
                done()
            }
        })
    })
})




//Test create product success

describe('test create product success', () => {
    test('Object in return with keys: name, image_url, price',(done) => {
        request(app)
            .post('/products')
            .set('token', accessToken)
            .send(dataProduct)
            .end(function(err, res) {
                if(err) throw err;
                else {
                    expect(res.status).toBe(201)
                    productId = res.body.id
                    expect(res.body).toHaveProperty('id', expect.any(Number));
                    expect(res.body).toHaveProperty('name', dataProduct.name);
                    expect(res.body).toHaveProperty('image_url', dataProduct.image_url);
                    expect(res.body).toHaveProperty('price', dataProduct.price);
                    expect(res.body).toHaveProperty('stock', dataProduct.stock);
                    done()
                }
            })
    } )
})

//End test create product success


//Test create product fail

describe('test create product fail', () => {
    test('if theres no token',(done) => {
        request(app)
            .post('/products')
            .send(dataProduct)
            .end(function(err, res) {
                if(err) throw err;
                else {
                    expect(res.status).toBe(401)
                    expect(res.body).toHaveProperty('error', 'Authentication error')
                    done()
                }
            })
    })
    test('if isnt admin token', (done) => {
        request(app)
        .post('/products')
        .set('token', userToken)
        .send(dataProduct)
        .end(function(err, res) {
            if(err) throw err
            else {
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('error', 'Authentication error')
                done()
            }
        })
    })
    test('if required text is empty', (done) => {
        request(app)
        .post('/products')
        .set('token', accessToken)
        .send({
            name: '',
            image_url: 'www.google.com',
            price: 10000,
            stock: 5
        })
        .end(function(err, res) {
            const errors = ["Product's name can't be empty"]
            if(err) throw err
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(errors)
                done()
            }
        })
    })
    test('if price less than zero', (done) => {
        request(app)
        .post('/products')
        .set('token', accessToken)
        .send({
            name: 'tahu goreng',
            image_url: 'www.google.com',
            price: -10000,
            stock: 5
        })
        .end(function(err, res) {
            const errors = ["Product's price can't be less than 0"]
            if(err) throw err
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(errors)
                done()
            }
        })
    })
    test('if stock less than zero', (done) => {
        request(app)
        .post('/products')
        .set('token', accessToken)
        .send({
            name: 'tahu goreng',
            image_url: 'www.google.com',
            price: 10000,
            stock: -5
        })
        .end(function(err, res) {
            const errors = ["Product's stock can't be less than zero"]
            if(err) throw err
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(errors)
                done()
            }
        })
    })
    test('datatype is not correct', (done) => {
        request(app)
        .post('/products')
        .set('token', accessToken)
        .send({
            name: 'tahu goreng',
            image_url: 'www.google.com',
            price: "10000",
            stock: 5
        })
        .end(function(err, res) {
            const errors = ["Input the right format"]
            if(err) throw err
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(errors)
                done()
            }
        })
    })  
})

//End test create product fail


//Test update product success

describe('test update product success', () => {
    test('Will return status-code 200 and object edit message',(done) => {
        request(app)
            .put(`/products/${productId}`)
            .set('token', accessToken)
            .send({
                name: 'test edit',
                image_url: 'www.google.com',
                price: 9000,
                stock: 10
            })
            .end(function(err, res) {
                if(err) throw err;
                else {
                    expect(res.status).toBe(200)
                    expect(res.body).toHaveProperty('edit');
                    expect(res.body).toHaveProperty('message', 'Product edited');
                    done()
                }
            })
    })
})

//End test update product success



//Test update product fail

describe('test update product fail', () => {
    test('Will return message',(done) => {
        request(app)
            .put(`/products/${productId}`)
            .send({
                name: 'lagi edit',
                image_url: 'www.google.com',
                price: 9000,
                stock: 10
            })
            .end(function(err, res) {
                if(err) throw err;
                else {
                    expect(res.status).toBe(401)
                    expect(res.body).toHaveProperty('error', 'Authentication error');
                    done()
                }
            })
    })
    test("The token isn't correct", (done) => {
        request(app)
        .put(`/products/${productId}`)
        .set('token', userToken)
        .send({
            name: 'bakwan',
            image_url: 'www.gmail.com',
            price: 2000,
            stock: 1
        })
        .end(function(err, res) {
            if(err) throw err
            else {
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('error', 'Authentication error')
                done()
            }
        })
    })
    test('if price less than zero', (done) => {
        request(app)
        .put(`/products/${productId}`)
        .set('token', accessToken)
        .send({
            name: 'tahu goreng',
            image_url: 'www.google.com',
            price: -10000,
            stock: 5
        })
        .end(function(err, res) {
            const errors = ["Product's price can't be less than 0"]
            if(err) throw err
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(errors)
                done()
            }
        })
    })
    test('update stock with minus', (done) => {
        request(app)
        .put(`/products/${productId}`)
        .set('token', accessToken)
        .send({
            name: 'tahu goreng',
            image_url: 'www.google.com',
            price: 10000,
            stock: -5
        })
        .end(function(err, res) {
            const errors = ["Product's stock can't be less than zero"]
            if(err) throw err
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(errors)
                done()
            }
        })
    })
    test('datatype is not correct', (done) => {
        request(app)
        .put(`/products/${productId}`)
        .set('token', accessToken)
        .send({
            name: 'tahu goreng',
            image_url: 'www.google.com',
            price: "10000",
            stock: 5
        })
        .end(function(err, res) {
            const errors = ["Input the right format"]
            if(err) throw err
            else {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(errors)
                done()
            }
        })
    })
})

//End test update product fail


//Test delete product success

describe('test delete product succeed', () => {
    test('Will return status-code 400 and message',(done) => {
        request(app)
            .delete(`/products/${productId}`)
            .set('token', accessToken)
            .end(function(err, res) {
                if(err) throw err;
                else {
                    expect(res.status).toBe(200)
                    expect(res.body).toHaveProperty('message', 'product has been deleted');
                    done()
                }
            })
    })
})

//End test delete product success


//Test delete product fail

describe('test delete product fail', () => {
    test('If didnt have access token',(done) => {
        request(app)
            .delete(`/products/${productId}`)
            .end(function(err, res) {
                if(err) throw err;
                else {
                    expect(res.status).toBe(401)
                    expect(res.body).toHaveProperty('error', 'Authentication error')
                    done()
                }
            })
    })
    test("If it's not admin's access token",(done) => {
        request(app)
            .delete(`/products/${productId}`)
            .set('token', userToken)
            .end(function(err, res) {
                if(err) throw err;
                else {
                    expect(res.status).toBe(401)
                    expect(res.body).toHaveProperty('error', 'Authentication error')
                    done()
                }
            })
    })
})

//End test delete product fail




