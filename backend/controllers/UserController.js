const {
    User, Product, ProductImage, ShoppingCart, LineItem, Order
} = require('../models')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const {strGenerator} = require('../helpers/strRandom')
const jwt = require('../helpers/jwtHelpers')

class UserController {
    
    // --- fungsi untuk merender dan menampilkan semua data users ---
    static async test(req, res){
        try {
            // User
            // let result = await User.findAll({
            //     include: [{
            //         model: Product
            //     },{
            //         model: ShoppingCart
            //     },{
            //         model: Order
            //     }]
            // })

            // Product All
            // let result = await Product.findAll({
            //     // where: {
            //     //     strId
            //     // },
            //     include: [{
            //         model: User,
            //         foreignKey: 'UserId',
            //     },{
            //         model: ProductImage
            //     },{
            //         model: LineItem
            //     }]
            // })

            // Order
            // let result = await Order.findAll({
            //     include: [{
            //         model: User,
            //         foreignKey: 'UserId',
            //     },{
            //         model: LineItem
            //     }]
            // })

            // Line Item
            // let result = await LineItem.findAll({
            //     include: [{
            //         model: Product,
            //         foreignKey: 'ProductId',
            //     },{
            //         model: ShoppingCart,
            //         foreignKey: 'ShoppingCartId',
            //     },{
            //         model: Order,
            //         foreignKey: 'OrderName',
            //     }]
            // })

            // Mix
            let result = await LineItem.findAll({
                include: [{
                    model: Product,
                    foreignKey: 'ProductId',
                    include: [{
                        model: User,
                    },{
                        model: ProductImage,
                    }]
                },{
                    model: ShoppingCart,
                    foreignKey: 'ShoppingCartId',
                },{
                    model: Order,
                    foreignKey: 'OrderName',
                }]
            })


            // res.json('testing')
            res.json(result)
        } catch (err) {
            res.json(err)
        }
    }

    // --- fungsi untuk merender dan menampilkan semua data users ---
    static async index(req, res){
        try {
            // User
            // let result = await User.findAll({
            //     order: [
            //         ['id', 'asc']
            //     ]
            // })

            

            // let result = strGenerator(10)

            res.json({users:result})
            // res.render('./user/index.ejs', {users:result})
        } catch (err) {
            res.json(err)
        }
    }
       
    // --- fungsi untuk mengelola form create di back-end ---
    static async store(req, res){
        try {
            let uuid = uuidv4()
            // console.log(uuid)
            let avatar = null
            let bio = null
            let status = 0
            let { username, email, password, fullname} = req.body;
            let hashPwd = bcrypt.hashSync(password, 5)

            let user = await User.create({
                uuid, username, email, password:hashPwd, fullname, avatar, bio, status
            })

            res.json(user)
            // res.json('berhasil menambahkan user')
            // res.redirect('/users')
            
        } catch (err) {
            res.json(err)
        }
    }
    
    // --- fungsi untuk merender dan menampilkan sebuah data user ---
    static async show(req, res){
        try {
            // console.log(req.headers)
            const access_token = req.headers['access-token']
            // const data = jwt.tokenVerifier(access_token)
            let verifyToken = jwt.tokenVerifier(access_token, 'secret')
            // console.log(verifyToken.uuid)
            let id = verifyToken.id
            // console.log(uuid)
            let user = await User.findOne({
                where: {
                    id
                },
                include: [{
                    model: ShoppingCart,
                    include: [{
                        model: LineItem
                    }]
                },{
                    model: Order
                }]

            })
            if(user){
                res.json(user)
            } else {
                res.json("User not found")
            }
            // res.json(req.headers['access-token'])
            // console.log(user)
            

        } catch (err) {
            // res.json(err)
        }
    }
    
    // --- fungsi untuk mengelola form edit user di back-end ---
    static async update(req, res){
        try {
            console.log('update');
            const access_token = req.headers['access-token']
            let verifyToken = jwt.tokenVerifier(access_token, 'secret')
            let id = verifyToken.id

            // console.log(req.body);
            let { name, email, birthdate, gender} = req.body;
            let result = await User.update({
                name, 
                email, 
                birthdate, 
                gender
            }, {
                where: {
                    id: id
                }
            })

            if(result){
                res.json(result)
            } else {
                res.json("User not found")
            }
        } catch (err) {
            res.json(err)
        }
    }
    
    // --- fungsi untuk mengelola delete sebuah user di back-end ---
    static async destroy(req, res){
        try {
            let uuid = req.params.uuid

            let result = await User.destroy({
                where: {
                    uuid: uuid
                }
            })

            // res.redirect('/users')
            res.json('berhasil menghapus user')
            
        } catch (err) {
            res.json(err)
        }
    }
}

module.exports = UserController;