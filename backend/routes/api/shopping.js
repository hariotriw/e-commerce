const {Router} = require('express')
const shoppingRoutes = Router()
const {ShoppingController} = require('../../controllers')

shoppingRoutes.get("/testing", ShoppingController.test)
// shoppingRoutes.post("/testing", ShoppingController.test)
shoppingRoutes.get("/katalog/all", ShoppingController.katalogAllProduct)
shoppingRoutes.get("/checkout", ShoppingController.getDataCheckout)
shoppingRoutes.get("/order", ShoppingController.getDataOrder)
shoppingRoutes.get("/payment/:trxNumber", ShoppingController.getDataPayment)
shoppingRoutes.post("/addItemToCart", ShoppingController.addItemToCart)
shoppingRoutes.post("/checkoutCart", ShoppingController.checkoutCart)
shoppingRoutes.post("/orderCart", ShoppingController.orderCart)
shoppingRoutes.post("/payOrder", ShoppingController.payOrder)
shoppingRoutes.post("/finishOrder", ShoppingController.finishOrder)
shoppingRoutes.post("/cancelOrder", ShoppingController.cancelOrder)

module.exports = shoppingRoutes;
