const jwt = require('jsonwebtoken')

const signToken = (payload) => {
    const token = jwt.sign(payload, 'rahasia');
    return token;
}

const verifyToken = (token) => {
    const decoded = jwt.verify(token, 'rahasia')
    return decoded
}

module.exports = {
    signToken,
    verifyToken
};