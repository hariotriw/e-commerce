const jwt = require('jsonwebtoken')

const tokenGenerator = (data) => {
    const {id, name, email, role, salt, password} = data
    return jwt.sign({
        id, name, email, role, salt, password
    }, 'secret')
}

const tokenVerifier = (data, password) => {
    return jwt.verify(data, password)
}

module.exports = {
    tokenGenerator, tokenVerifier
}