const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.json('Ini Route Home');
})

// Api Routes
const authRoutes = require('./api/auth.js')
const adminRoutes = require('./api/admin.js')
const userRoutes = require('./api/user.js')
const shoppingRoutes = require('./api/shopping.js')
route.use('/api/', authRoutes)
route.use('/api/admins', adminRoutes)
route.use('/api/users', userRoutes)
route.use('/api/shop', shoppingRoutes)

module.exports = route;