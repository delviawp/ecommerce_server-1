module.exports = function (err, req, res, next) {
    let errors = []
    let statusCode = 500
    switch (err.name) {
        case 'SequelizeValidationError':
            err.errors.forEach(el => {
                errors.push(el.message)
            })
            statusCode = 400
            //console.log(errors, 'ini error handler')
            break;
        default:
            errors.push(err.msg || 'internal server error')
            statusCode = err.status || 500
            console.log(err.msg)
            break;
    }
    console.log(errors, 'ini eror handler')
    res.status(statusCode).json({ errors })
}