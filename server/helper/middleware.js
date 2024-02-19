
function validateEmail(req, res, next) {
    if (!req.body || !req.body.email) {
        console.log(req.body);
        return res.status(400).json({
            status:  400,
            error: true,
            message: 'Email is required!'
        });
    }

    if (!isValidEmail(req.body.email)) {
        return res.status(400).json({
            status:  400,
            error: true,
            message: 'Invalid Email'
        });
    }

    next(); // Proceed to the next middleware if the email is valid
}


function isValidEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

module.exports = {
    validateEmail
}