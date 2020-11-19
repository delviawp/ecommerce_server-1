async function authorization (req, res, next) {
    try {
        if(req.loggedInUser.role == 'admin') {
            //console.log(req.loggedInUser.role)
            next()
        } 
    } catch (error) {
        //console.log(error)
        res.status(400).json(error)
    }
}

module.exports = authorization

