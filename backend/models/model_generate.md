#

## Command geerate model

<!-- Start of Bash -->

```bash
# User
    npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string,salt:string,birthdate:date,gender:string,avatar:string,role:string

# Product
    npx sequelize-cli model:generate --name Product --attributes name:string,desc:string,price:integer,stock:integer,expire:date,weight:integer,category:string,brand:string,condition:string,total_sold:integer,rating:integer,views:integer,UserId:integer

# ProductImage
    npx sequelize-cli model:generate --name ProductImage --attributes filename:string,filesize:string,filetype:string,primary:boolean,ProductId:integer

# ShoppingCart
    npx sequelize-cli model:generate --name ShoppingCart --attributes status:string,UserId:integer

# LineItem
    npx sequelize-cli model:generate --name LineItem --attributes quantity:integer,status:string,ProductId:integer,ShoppingCartId:integer,OrderName:string,ShoppingProductId:integer

# Order
    npx sequelize-cli model:generate --name Order --attributes name:string,subtotal:integer,discount:integer,tax:integer,totaldue:integer,totalquantity:integer,payment_transaction:string,city:string,address:string,status:string,UserId:integer
```

<!-- End of Bash -->
