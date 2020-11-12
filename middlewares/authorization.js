async function authorization (req, res, next) {
    try {
        if(req.loggedInUser.role == 'admin') {
            console.log(req.loggedInUser.role)
            next()
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = authorization

