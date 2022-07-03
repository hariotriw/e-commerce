const {
    User, Product, ProductImage, ShoppingCart, LineItem, Order
} = require('../models')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const {strGenerator} = require('../helpers/strRandom')
const jwt = require('../helpers/jwtHelpers')

class AdminController {
    
    // --- fungsi untuk merender dan menampilkan semua data users ---
    static async test(req, res){
        try {
            // res.json('testing')
        } catch (err) {
            // res.json(err)
        }
    }

    // --- fungsi untuk merender dan menampilkan semua data products ---
    static async index(req, res){
        try {
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            const UserId = verifyToken.id
            const role = verifyToken.role
            if(role === "admin"){
                // Product All
                let result = await Product.findAll({
                    // where: {
                    //     strId
                    // },
                    include: [{
                        model: User,
                        foreignKey: 'UserId',
                    },{
                        model: ProductImage
                    },{
                        model: LineItem
                    }]
                })
                res.json({products: result})
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
        } catch (err) {
            // res.json(err)
        }
    }
       
    // --- fungsi untuk mengelola form create di back-end ---
    static async store(req, res){
        try {
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            const UserId = verifyToken.id
            const role = verifyToken.role
            // console.log(req.body);
            if(role === "admin"){
                // console.log(req.body)
                // let { name, desc, price, stock, expire, weight, category, brand, condition} = req.body;
                let name = req.body.dataForm.name || ' '
                let desc = req.body.dataForm.desc || ' '
                let price = req.body.dataForm.price || 0
                let stock = req.body.dataForm.stock || 0
                let expire = req.body.dataForm.expire || null
                let weight = req.body.dataForm.weight || 0
                let category = req.body.dataForm.category || 'no-category'
                let brand = req.body.dataForm.brand || ' '
                let condition = req.body.dataForm.condition || ' '
                const total_sold = 0
                const rating = 0
                const views = 0
                // total_sold, rating, views
                
                let product = await Product.create({
                    name, 
                    desc, 
                    price,
                    stock, 
                    expire, 
                    weight, 
                    category, 
                    brand, 
                    condition, 
                    total_sold, 
                    rating, 
                    views, 
                    UserId
                })
    
                // aray dari gambar yang ditambahin [NOT FINISHED]
                let arrImg = req.body.resultFiles
                // console.log(req.body.imageNames)
                console.log(arrImg)
                if(arrImg !== undefined){
                    console.log('testing 1')
                        console.log('testing 2')
                        let id = product.id
                        // let id = 1
                        // console.log(arrImg.imageOne)
                        if(arrImg.imageOne !== undefined){
                            console.log('image 1 ada')
                            ProductImage.create({
                                filename: req.body.imageNames[0], 
                                filesize: arrImg.imageOne[0].size, 
                                filetype: arrImg.imageOne[0].mimetype, 
                                primary: false, 
                                ProductId:id
                            })
                        }
                        if(arrImg.imageTwo !== undefined){
                            console.log('image 2 ada')
                            ProductImage.create({
                                filename: req.body.imageNames[1], 
                                filesize: arrImg.imageTwo[0].size, 
                                filetype: arrImg.imageTwo[0].mimetype, 
                                primary: false, 
                                ProductId:id
                            })
                            
                        }
                        if(arrImg.imageThree !== undefined){
                            console.log('image 3 ada')
                            ProductImage.create({
                                filename: req.body.imageNames[2], 
                                filesize: arrImg.imageThree[0].size, 
                                filetype: arrImg.imageThree[0].mimetype, 
                                primary: false, 
                                ProductId:id
                            })
                            
                        }
                        if(arrImg.imageFour !== undefined){
                            console.log('image 4 ada')
                            ProductImage.create({
                                filename: req.body.imageNames[3], 
                                filesize: arrImg.imageFour[0].size, 
                                filetype: arrImg.imageFour[0].mimetype, 
                                primary: false, 
                                ProductId:id
                            })

                        }
        
                }
                // let arrImgInput = []
                // arrImg.forEach((image, i) => {
                //     let id = product.id
                //     arrImg[i] = ProductImage.create({
                //         filename, filesize, filetype, primary, ProductId:id
                //     })
    
                // })

                res.status(201).json('berhasil menambahkan product')

            } else {
                res.status(403).json("You don't have access to use this features..")
            }
            
            
        } catch (err) {
            res.json(err)
        }
    }
    
    // --- fungsi untuk merender dan menampilkan sebuah data user ---
    static async show(req, res){
        try {
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            const UserId = verifyToken.id
            const role = verifyToken.role
            if(role === "admin"){
                let id = req.params.id
                // let product = await Product.findAll({
                let product = await Product.findOne({
                    where: {
                        id
                    },
                    // include: [{
                    //     model: User,
                    //     foreignKey: 'UserId',
                    // },{
                    //     model: ProductImage
                    // },{
                    //     model: LineItem
                    // }]
                })
                res.json(product)
                // res.json(user)
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
            

        } catch (err) {
            res.json(err)
        }
    }
    
    // --- fungsi untuk mengelola form edit user di back-end ---
    static async edit(req, res){
        try {
            console.log("ini edit product");
            // console.log(req.params);
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            const UserId = verifyToken.id
            const role = verifyToken.role
            let id = req.params.id
            if(role === "admin"){
                // let product = await Product.findAll({
                let product = await Product.findOne({
                    where: {
                        id
                    },
                    // include: [{
                    //     model: User,
                    //     foreignKey: 'UserId',
                    // },{
                    //     model: ProductImage
                    // },{
                    //     model: LineItem
                    // }]
                    include: [{
                        model: ProductImage
                    }]
                })
                // console.log(product)
                res.status(201).json(product)
                // res.json('berhasil mengubah user')
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
            
        } catch (err) {
            res.status(500).json(err)
        }
    }

    // --- fungsi untuk mengelola form edit user di back-end ---
    static async update(req, res){
        try {
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            const UserId = verifyToken.id
            const role = verifyToken.role
            console.log(req.body);
            if(role === "admin") {
                let { id, name, desc, price, stock, expire, weight, category, brand, condition} = req.body;

                let product = await Product.update({
                    name: name, 
                    desc: desc, 
                    price: +price,
                    stock: +stock, 
                    expire: expire, 
                    weight: +weight, 
                    category: category, 
                    brand: brand, 
                    condition: condition
                }, {
                    where: {
                        id: id
                    }
                })

                // aray dari gambar yang ditambahin [NOT FINISHED]
                // id product image ?
                // let arrImgInput = []
                // let arrImg = []
                // arrImg.forEach((image, i) => {
                //     let id = product.id
                //     arrImg[i] = ProductImage.update({
                //         filename, 
                //         filesize, 
                //         filetype, 
                //         primary, 
                //         ProductId:id
                //     }, {
                //         where: {
                //             id:id
                //         }
                //     })

                // })

                res.status(201).json("product successfully changed..")
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
            // res.json('berhasil mengubah user')
        } catch (err) {
            res.json(err)
        }
    }
    
    // --- fungsi untuk mengelola delete sebuah user di back-end ---
    static async destroy(req, res){
        try {
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            const UserId = verifyToken.id
            const role = verifyToken.role
            if(role === "admin"){

            } else {
                res.status(403).json("You don't have access to use this features..")
            }
            
        } catch (err) {
            res.json(err)
        }
    }

    // --- fungsi untuk merender dan menampilkan semua data orders ---
    static async listOrder(req, res){
        try {
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            const UserId = verifyToken.id
            const role = verifyToken.role
            if(role === "admin"){
                // Product All
                let result = await Order.findAll({
                    include: [{
                        model: User,
                        foreignKey: 'UserId',
                    },{
                        model: LineItem,
                        include: [{
                            model: Product,
                            foreignKey: 'ProductId',
                        }]
                    }]
                })
                res.json({orders: result})
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
        } catch (err) {
            // res.json(err)
        }
    }

    // --- fungsi untuk admin confirm order ---
    static async confirmOrder(req, res){
        try {
            console.log("order cart")
            console.log(req.body)
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            // const UserId = verifyToken.id
            const role = verifyToken.role
            if(role === "admin"){
                let {shopCartId, UserId, OrderName} = req.body
                // console.log(shopCartId);
                let shoppingCart = await ShoppingCart.findOne({
                    where: {
                        UserId: UserId, status: "closed", id: shopCartId
                    }
                })
                if (shoppingCart === null){
                    // Jika shopping cart tidak ditemukan
                    res.status(500).json("invalid shopping cart")
                } else {
                    // Jika shopping cart ditemukan
                    console.log("shopping cart found");
                    
                    let order = await Order.update({
                        status: "shipping"
                    },{
                        where: {
                            name: OrderName, status: "paid", UserId: UserId
                        }
                    })
                    if(order[0] === 1){
                        console.log("berhasil mengkonfirmasi Order");
                        res.status(201).json("cek console log backend")
                    } else {
                        res.status(500).json("error while confirming order..")
                    }
                    
                    
                }
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
        } catch (err) {
            res.json(err)
        }
    }
}

module.exports = AdminController;