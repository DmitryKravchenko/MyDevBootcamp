const chalk = require('chalk');
const ErrorResponse = require("../utils/ErrorResponse")
const errorHandler = (err, req, res, next) => {
    let error = { ...err }

    error.message = err.message

    // log to console for DEV
    // console.log(chalk.red(err.stack))
    console.log(err)


    // Mongoose bad ObjectID
    if (err.name === 'CastError') {
        const message = `Bootcamp not found with ID of ${err.value}`;
        error = new ErrorResponse(message, 404)
    }

    if (err.name === 'ValidationError') {
        // const message = [];
        // for (let variable in err.errors) {
        //     let itm = {}
        //     itm[variable] = err.errors[variable].message
        //     message.push(itm)
        // }
        // const message = Object.values(err.errors).map( itm => itm.properties.messages )
        const message = err.message;
        // console.log(message)
        error = new ErrorResponse(message, 400)
    }


    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

module.exports = errorHandler;
