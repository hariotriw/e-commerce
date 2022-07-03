const {
    User, Product, ProductImage, ShoppingCart, LineItem, Order
} = require('../models')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const {strGenerator} = require('../helpers/strRandom')
const orderNameGenerator = require('../helpers/orderNameGenerator')
const jwt = require('../helpers/jwtHelpers')

class ShoppingController {
    
    // --- fungsi untuk  ---
    static async test(req, res){
        try {
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
        } catch (err) {
            // res.json(err)
        }
    }

    // --- fungsi untuk  ---
    static async addItemToCart(req, res){
        try {
            console.log("add item to cart")
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            // console.log(verifyToken);
            const UserId = verifyToken.id
            const role = verifyToken.role
            if(role === "user"){
                let shoppingCart = await ShoppingCart.findOne({
                    where: {
                        UserId: UserId, status: "open"
                    }
                })
                console.log(shoppingCart);
                let shopCartId = undefined
                if (shoppingCart === null){
                    // Jika shopping cart tidak ada yang open
                    shopCartId = ShoppingCart.create({
                        status: "open", UserId
                    })
                    // console.log("membuat shopping cart open baru");
                    // console.log(shopCartId);
                } else {
                    // Jika shopping cart ada yang open
                    shopCartId = shoppingCart.id
                    // console.log("mengambil shopping cart opened");
                    // console.log(shopCartId)
                }
                let product = req.body
                console.log(product);
                console.log(shopCartId);
                let findLineItem = await LineItem.findOne({
                    where: {
                        ShoppingCartId: shopCartId, status: "cart", ProductId: product.ProductId
                    }
                })
                if (findLineItem === null){
                    // Jika Line Item belum ada
                    LineItem.create({
                        quantity:product.quantity,
                        ProductId: product.ProductId, 
                        ShoppingCartId: shopCartId,
                        status: "cart", 
                        OrderName: null,
                        ShoppingProductId: null
                    })
                    // console.log("membuat Line Item yang baru");
                    // console.log(shopCartId);
                } else {
                    // Jika Line Item sudah ada
                    LineItem.update({
                        quantity:product.quantity
                    },{
                        where: {
                            ProductId: product.ProductId, 
                            ShoppingCartId: shopCartId,
                            status: "cart", 
                        }
                    })
                    // console.log("mengambil shopping cart opened");
                    // console.log(shopCartId)
                }
                console.log(findLineItem)
                
                console.log("berhasil menambahkan Line Item");
                // res.json({testing: verifyToken})
                // res.json({products: result})
                // res.json({result: shoppingCart})
                res.json("cek console log backend")
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
        } catch (err) {
            res.json(err)
        }
    }

    // --- fungsi untuk  ---
    static async checkoutCart(req, res){
        try {
            console.log("checkout cart")
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            // console.log(verifyToken);
            const UserId = verifyToken.id
            const role = verifyToken.role
            if(role === "user"){
                let {shopCartId} = req.body
                // console.log(shopCartId);
                let shoppingCart = await ShoppingCart.findOne({
                    where: {
                        UserId: UserId, status: "open", id: shopCartId
                    }
                })
                // console.log(shoppingCart);
                if (shoppingCart === null){
                    // Jika shopping cart tidak ditemukan
                    res.status(500).json("invalid shopping cart")
                } else {
                    // Jika shopping cart ditemukan
                    console.log("line items");
                    let LineItems = await LineItem.findAll({
                        include: [{
                            model: Product,
                            foreignKey: 'ProductId',
                        },{
                            model: ShoppingCart,
                            foreignKey: 'ShoppingCartId',
                        },{
                            model: Order,
                            foreignKey: 'OrderName',
                        }],
                        where: {
                            ShoppingCartId: shopCartId, status: "cart"
                        }
                    })
                    // res.json(LineItems)
                    console.log(LineItems);
                    if (LineItems.length === 0){
                        // Jika Line Item tidak ditemukan
                        res.status(500).json("invalid Line Items")
                    } else {
                        // Jika Line Item sudah ada
                        
                        // init order data
                        let subtotal = 0
                        let discount = 0
                        let tax = 10
                        let totalquantity = 0
                        let totaldue = 0
                        let payment_transaction = ""
                        
                        const orderName = "codibook-" + strGenerator(7) + "-" + strGenerator(8)
                        console.log(orderName)
                        LineItems.forEach(lite => {
                            let lineIitemPrice = +lite.Product.price * +lite.quantity
                            // let lineIitemPrice = (+lite.Product.price * +lite.quantity) * ((100 - +discount) / 100)
                            subtotal += lineIitemPrice
                            totalquantity += +lite.quantity
                            lineIitemPrice = 0
                        })
                        if (totalquantity >= 0 && totalquantity < 3){ 
                            discount = 0
                        } else if (totalquantity >= 3 && totalquantity < 10){
                            discount = 5
                        } else if (totalquantity > 9){
                            discount = 10
                        } else {
                            discount = 0
                        }
                        totaldue = (subtotal + (subtotal * tax / 100)) - (subtotal * discount / 100)
                        console.log(totaldue)
                        // payment_transaction = strGenerator(20)
                        let order = Order.create({
                            name: orderName, subtotal, discount, tax, totaldue, totalquantity, payment_transaction, city: "", address: "", UserId, status: "open"
                        })
                        LineItems.forEach(Lite => {
                            console.log(Lite.id);
                            LineItem.update({
                                status: "checkout", OrderName: orderName
                            },{
                                where: {
                                    id: Lite.id, 
                                    ShoppingCartId: shopCartId,
                                    status: "cart"
                                }
                            })
                        })

                        ShoppingCart.update({
                            status: "closed"
                            },{
                            where: {
                                UserId: UserId, status: "open", id: shopCartId
                            }
                        })

                        console.log("berhasil menambahkan Line Item");
                        res.json("cek console log backend")
                    }
                }
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
        } catch (err) {
            res.json(err)
        }
    }

    // --- fungsi untuk proses order ---
    static async orderCart(req, res){
        try {
            console.log("order cart")
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            const UserId = verifyToken.id
            const role = verifyToken.role
            if(role === "user"){
                let {shopCartId, city, address, OrderName} = req.body
                console.log(req.body);
                console.log(shopCartId);
                let shoppingCart = await ShoppingCart.findOne({
                    where: {
                        UserId: UserId, id: shopCartId
                    }
                })
                if (shoppingCart === null){
                    // Jika shopping cart tidak ditemukan
                    res.status(500).json("invalid shopping cart")
                } else {
                    // Jika shopping cart ditemukan
                    console.log("shopping cart found");
                    let LineItems = await LineItem.findAll({
                        include: [{
                            model: Product,
                            foreignKey: 'ProductId',
                        },{
                            model: ShoppingCart,
                            foreignKey: 'ShoppingCartId',
                        },{
                            model: Order,
                            foreignKey: 'OrderName',
                        }],
                        where: {
                            ShoppingCartId: shopCartId, status: "checkout"
                        }
                    })
                    let payment_transaction = strGenerator(20)
                    await Order.update({
                        payment_transaction, city, address
                    },{
                        where: {
                            UserId, name: OrderName, status: "open"
                        }
                    })
                    .then(result => {
                        let statusUpdate = result[0]
                        console.log(statusUpdate);
                        if(+statusUpdate === 1) {
                            if (LineItems.length === 0){
                                // Jika Line Item tidak ditemukan
                                res.status(500).json("failed to changing Line Items")
                            } else {
                                // Jika Line Item sudah ada
                                LineItems.forEach(Lite => {
                                    console.log(Lite.id);
                                    LineItem.update({
                                        status: "ordered",
                                        OrderName: OrderName
                                    },{
                                        where: {
                                            id: Lite.id, 
                                            ShoppingCartId: shopCartId,
                                            status: "checkout"
                                        }
                                    })
                                })
                                ShoppingCart.update({
                                    status: "closed"
                                },{
                                    where: {
                                        id: shopCartId
                                    }
                                })
                                console.log("berhasil menambahkan Order");
                                res.json("cek console log backend")
                            }
                        } else {
                            res.status(500).status("error while creating order..")
                        }
                    })
                    .catch(err => {
                        res.status(500).status("error while creating order..")
                    })
                }
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
        } catch (err) {
            res.json(err)
        }
    }
    // --- fungsi untuk  ---
    static async checkoutCartCopy(req, res){
        try {
            console.log("checkout cart")
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            // console.log(verifyToken);
            const UserId = verifyToken.id
            const role = verifyToken.role
            if(role === "user"){
                let {shopCartId} = req.body
                // console.log(shopCartId);
                let shoppingCart = await ShoppingCart.findOne({
                    where: {
                        UserId: UserId, status: "open", id: shopCartId
                    }
                })
                // console.log(shoppingCart);
                if (shoppingCart === null){
                    // Jika shopping cart tidak ditemukan
                    res.status(500).json("invalid shopping cart")
                } else {
                    // Jika shopping cart ditemukan
                    console.log("line items");
                    let LineItems = await LineItem.findAll({
                        where: {
                            ShoppingCartId: shopCartId, status: "cart"
                        }
                    })
                    console.log(LineItems);
                    if (LineItems.length === 0){
                        // Jika Line Item tidak ditemukan
                        res.status(500).json("invalid Line Items")
                    } else {
                        // Jika Line Item sudah ada
                        LineItems.forEach(Lite => {
                            console.log(Lite.id);
                            LineItem.update({
                                status: "checkout"
                            },{
                                where: {
                                    id: Lite.id, 
                                    ShoppingCartId: shopCartId,
                                    status: "cart"
                                }
                            })
                        })
                        console.log("berhasil menambahkan Line Item");
                        res.json("cek console log backend")
                    }
                }
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
        } catch (err) {
            res.json(err)
        }
    }

    // --- fungsi untuk proses order ---
    static async orderCartCopy(req, res){
        try {
            console.log("order cart")
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            const UserId = verifyToken.id
            const role = verifyToken.role
            if(role === "user"){
                let {shopCartId, city, address} = req.body
                // console.log(shopCartId);
                let shoppingCart = await ShoppingCart.findOne({
                    where: {
                        UserId: UserId, status: "open", id: shopCartId
                    }
                })
                if (shoppingCart === null){
                    // Jika shopping cart tidak ditemukan
                    res.status(500).json("invalid shopping cart")
                } else {
                    // Jika shopping cart ditemukan
                    console.log("shopping cart found");
                    let LineItems = await LineItem.findAll({
                        include: [{
                            model: Product,
                            foreignKey: 'ProductId',
                        },{
                            model: ShoppingCart,
                            foreignKey: 'ShoppingCartId',
                        },{
                            model: Order,
                            foreignKey: 'OrderName',
                        }],
                        where: {
                            ShoppingCartId: shopCartId, status: "checkout"
                        }
                    })
                    // init order data
                    let subtotal = 0
                    let discount = 0
                    let tax = 10
                    let totalquantity = 0
                    let totaldue = 0
                    let payment_transaction = ""
                    
                    const orderName = "codibook-" + strGenerator(7) + "-" + strGenerator(8)
                    
                    LineItems.forEach(lite => {
                        let lineIitemPrice = +lite.Product.price * +lite.quantity
                        // let lineIitemPrice = (+lite.Product.price * +lite.quantity) * ((100 - +discount) / 100)
                        subtotal += lineIitemPrice
                        totalquantity += +lite.quantity
                        lineIitemPrice = 0
                    })
                    if (totalquantity >= 0 && totalquantity < 3){ 
                        discount = 0
                    } else if (totalquantity >= 3 && totalquantity < 10){
                        discount = 5
                    } else if (totalquantity > 9){
                        discount = 10
                    } else {
                        discount = 0
                    }
                    totaldue = (subtotal + (subtotal * tax / 100)) - (subtotal * discount / 100)
                    payment_transaction = strGenerator(20)
                    let order = await Order.create({
                        name: orderName, subtotal, discount, tax, totaldue, totalquantity, payment_transaction, city, address, UserId, status: "open"
                    })
                    if(order){
                        if (LineItems.length === 0){
                            // Jika Line Item tidak ditemukan
                            res.status(500).json("failed to changing Line Items")
                        } else {
                            // Jika Line Item sudah ada
                            LineItems.forEach(Lite => {
                                console.log(Lite.id);
                                LineItem.update({
                                    status: "ordered",
                                    OrderName: orderName
                                },{
                                    where: {
                                        id: Lite.id, 
                                        ShoppingCartId: shopCartId,
                                        status: "checkout"
                                    }
                                })
                            })
                            ShoppingCart.update({
                                status: "closed"
                            },{
                                where: {
                                    id: shopCartId
                                }
                            })
                            console.log("berhasil menambahkan Order");
                            res.json("cek console log backend")
                        }
                    } else {
                        res.status(500).status("error while creating order..")
                    }
                    
                    
                }
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
        } catch (err) {
            res.json(err)
        }
    }

    // --- fungsi untuk user pay order ---
    static async payOrder(req, res){
        try {
            console.log("order cart")
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            const UserId = verifyToken.id
            const role = verifyToken.role
            if(role === "user"){
                let {shopCartId, payment_transaction, OrderName} = req.body
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
                        status: "paid"
                    },{
                        where: {
                            name: OrderName, payment_transaction: payment_transaction, status: "open", UserId: UserId
                        }
                    })
                    if(order[0] === 1){
                        console.log("berhasil membayarkan Order");
                        res.json("cek console log backend")
                    } else {
                        res.status(500).json("error while updating order..")
                    }
                    
                    
                }
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
        } catch (err) {
            res.json(err)
        }
    }

    // --- fungsi untuk user finish order ---
    static async finishOrder(req, res){
        try {
            console.log("order cart")
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            const UserId = verifyToken.id
            const role = verifyToken.role
            if(role === "user"){
                let {shopCartId, OrderName} = req.body
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
                        status: "closed"
                    },{
                        where: {
                            name: OrderName, status: "shipping", UserId: UserId
                        }
                    })
                    if(order[0] === 1){
                        console.log("berhasil menyelesaikan Order");
                        res.json("cek console log backend")
                    } else {
                        res.status(500).json("error while finishing order..")
                    }
                    
                    
                }
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
        } catch (err) {
            res.json(err)
        }
    }

    // --- fungsi untuk user cancel order ---
    static async cancelOrder(req, res){
        try {
            console.log("order cart")
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            const UserId = verifyToken.id
            const role = verifyToken.role
            if(role === "user"){
                let {shopCartId, OrderName} = req.body
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
                        status: "cancelled"
                    },{
                        where: {
                            name: OrderName, status: "paid", UserId: UserId
                        }
                    })
                    if(order[0] === 1){
                        console.log("berhasil membatalkan Order");
                        res.json("cek console log backend")
                    } else {
                        res.status(500).json("error while cancelling order..")
                    } 
                }
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
        } catch (err) {
            res.json(err)
        }
    }

    // --- fungsi untuk user mengambil data checkout ---
    static async getDataCheckout(req, res){
        try {
            console.log("chekout cart")
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            const UserId = verifyToken.id
            const role = verifyToken.role
            if(role === "user"){
                // let shopCartId = req.params.CartId
                // console.log(shopCartId);
                let shoppingCart = await ShoppingCart.findAll({
                    where: {
                        UserId: UserId, status: "open"
                    },
                    include: [{
                        model: LineItem,
                        include: [{
                            model: Product,
                            foreignKey: 'ProductId',
                            include: [{
                                model: ProductImage,
                            }]
                        },{
                            model: Order,
                            foreignKey: 'OrderName',
                        }]
                    }]
                })
                //     Line Item
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
                if (shoppingCart === null){
                    // Jika shopping cart tidak ditemukan
                    res.status(500).json("invalid shopping cart")
                } else {
                    // Jika shopping cart ditemukan
                    console.log("shopping cart found");
                    res.json(shoppingCart)
                }
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
        } catch (err) {
            res.status(403).json(err)
        }
    }
    // --- fungsi untuk user mengambil data checkout ---
    static async getDataCheckoutCopy(req, res){
        try {
            console.log("order cart")
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            const UserId = verifyToken.id
            const role = verifyToken.role
            if(role === "user"){
                // let shopCartId = req.params.CartId
                // console.log(shopCartId);
                let shoppingCart = await ShoppingCart.findOne({
                    where: {
                        UserId: UserId, status: "open"
                    },
                    include: [{
                        model: LineItem
                    }]
                })
                //     Line Item
                let result = await LineItem.findAll({
                    include: [{
                        model: Product,
                        foreignKey: 'ProductId',
                    },{
                        model: ShoppingCart,
                        foreignKey: 'ShoppingCartId',
                    },{
                        model: Order,
                        foreignKey: 'OrderName',
                    }]
                })
                if (shoppingCart === null){
                    // Jika shopping cart tidak ditemukan
                    res.status(500).json("invalid shopping cart")
                } else {
                    // Jika shopping cart ditemukan
                    console.log("shopping cart found");
                    res.json(shoppingCart)
                }
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
        } catch (err) {
            res.json(err)
        }
    }
    // --- fungsi untuk user mengambil data checkout ---
    static async getDataOrder(req, res){
        try {
            console.log("order cart")
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            const UserId = verifyToken.id
            const role = verifyToken.role
            if(role === "user"){
                // let orderName = req.params.orderName
                // console.log(orderId);
                
                //     Line Item
                let order = await Order.findAll({
                    include: [{
                        model: LineItem,
                        sourceKey: 'OrderName',
                        include: [{
                            model: Product,
                            foreignKey: 'ProductId',
                            include: [{
                                model: ProductImage,
                            }]
                        }]
                    }],
                    where: {
                        UserId
                    },
                        order: [['updatedAt', 'DESC']]
                })
                if (order === null){
                    // Jika order tidak ditemukan
                    res.status(500).json("invalid order")
                } else {
                    // Jika order ditemukan
                    console.log("order found");
                    res.json(order)
                }
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
        } catch (err) {
            res.json(err)
        }
    }
    // --- fungsi untuk user mengambil data checkout ---
    static async getDataPayment(req, res){
        try {
            console.log("order cart")
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            const UserId = verifyToken.id
            const role = verifyToken.role
            if(role === "user"){
                let payment_transaction = req.params.trxNumber
                // console.log(orderId);
                
                //     Line Item
                let order = await Order.findOne({
                    include: [{
                        model: User,
                        foreignKey: 'UserId',
                        attributes: {exclude: ['password', 'salt', 'birthdate', 'gender']}
                    },{
                        model: LineItem,
                        sourceKey: 'OrderName'
                    }],
                    where: {
                        UserId, payment_transaction: payment_transaction, status: "open"
                    }
                })
                if (order === null){
                    // Jika order tidak ditemukan
                    res.status(500).json("invalid transaction")
                } else {
                    // Jika order ditemukan
                    console.log("transaction found");
                    res.json(order)
                }
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
        } catch (err) {
            res.json(err)
        }
    }

 

    // --- fungsi untuk merender dan menampilkan semua data products ---
    static async katalogAllProduct(req, res){
        try {
            // const access_token = req.headers['access-token']
            // if(access_token){
            //     const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            //     const UserId = verifyToken.id
            //     const role = verifyToken.role
            //     console.log(UserId);
            //     console.log(role);
            // }
            // Product All
            let result = await Product.findAll({
                include: [{
                    model: ProductImage
                },{
                    model: LineItem,
                    include: [{
                        model: ShoppingCart,
                        foreignKey: 'ShoppingCartid',
                    }]
                }]
            })
            res.json({products: result})
        } catch (err) {
            res.json(err)
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
            if(role === "admin"){
                let { name, desc, stock, expire, weight, category, brand, condition} = req.body;
                const total_sold = 0
                const rating = 0
                const views = 0
                // total_sold, rating, views
                
                let product = await Product.create({
                    name, 
                    desc, 
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
                let arrImgInput = []
                let arrImg = []
                arrImg.forEach((image, i) => {
                    let id = product.id
                    arrImg[i] = ProductImage.create({
                        filename, filesize, filetype, primary, ProductId:id
                    })
    
                })
    
                // res.json(product)
                res.json('berhasil menambahkan product')
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
            
            
        } catch (err) {
            res.json(err)
        }
    }

    // --- fungsi untuk mengelola form edit user di back-end ---
    static async update(req, res){
        try {
            const access_token = req.headers['access-token']
            const verifyToken = jwt.tokenVerifier(access_token, 'secret')
            const UserId = verifyToken.id
            const role = verifyToken.role
            if(role === "admin") {
                let { id, name, desc, stock, expire, weight, category, brand, condition} = req.body;

                let product = await Product.update({
                    name: name, 
                    desc: desc, 
                    stock: +stock, 
                    expire: expire, 
                    weight: +weight, 
                    category: category, 
                    brand: brand, 
                    condition: condition, 
                    UserId: UserId
                }, {
                    where: {
                        id: id
                    }
                })

                // aray dari gambar yang ditambahin [NOT FINISHED]
                // id product image ?
                let arrImgInput = []
                let arrImg = []
                arrImg.forEach((image, i) => {
                    let id = product.id
                    arrImg[i] = ProductImage.update({
                        filename, 
                        filesize, 
                        filetype, 
                        primary, 
                        ProductId:id
                    }, {
                        where: {
                            id:id
                        }
                    })

                })

                res.status(201).json("product successfully changed..")
            } else {
                res.status(403).json("You don't have access to use this features..")
            }
            // res.json('berhasil mengubah user')
        } catch (err) {
            res.json(err)
        }
    }
}

module.exports = ShoppingController;