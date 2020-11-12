const request = require('supertest')
const app = require('../app')
const { User } = require('../models')

let user = {
    email: 'admin@mail.com',
    password: '1234',
    role: 'admin'
}


beforeAll(async done => {
    try {
        await User.create(user)
        done()
    } catch (error) {
        done(error)
    }
})

afterAll(function(done) {
    if(process.env.NODE_ENV == 'test') {
        User.destroy({ truncate: true})
        .then(_=> {
            done()
        })
        .catch(err => {
           done(err) 
        })
    }
})

describe('test login / test case success', () => {
    test('Object in return with keys: message, code-status, id, and email',(done) => {
        request(app)
            .post('/login')
            .send(user)
            .end(function(err, res) {
                if(err) throw err;
                else {
                    expect(res.status).toBe(200)
                    expect(res.body).toHaveProperty('message', 'user success to login');
                    expect(res.body).toHaveProperty('statusCode', 200);
                    expect(res.body).toHaveProperty('token', expect.any(String));
                    expect(res.body).not.toHaveProperty('password');
                    done()
                    
                }
            })
    } )
})

describe('test login / error cases', () => {
    test('Email is empty', (done) => {
        request(app)
        .post('/login')
        .send({
            email: '',
            password: '1234'
        })
        .end(function(err, res) {
            //const errors = ['invalid email format']
            if(err) throw err;
            else {
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', 'Invalid email/password')
                done()
            }
        })
    }),
    test('Input the invalid password', (done) => {
        request(app)
        .post('/login')
        .send({
            email: 'main@admin.com',
            password: '12345'
        })
        .end(function(err, res) {
            //const errors = ['invalid email format']
            if(err) throw err;
            else {
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', 'Invalid email/password')
                done()
            }
        })
    }),
    test('Email and Password both empty', (done) => {
        request(app)
        .post('/login')
        .send({
            email: '',
            password: ''
        })
        .end(function(err, res) {
            //const errors = ['invalid email format']
            if(err) throw err;
            else {
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', 'Invalid email/password')
                done()
            }
        })
    })
})