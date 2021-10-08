const mongoose = require('mongoose');

// connect with mongodb orders database (if not then created) using mongoose
const conn = mongoose.connect('mongodb://localhost:27017/orders', {useNewUrlParser:true});

// const conn = mongoose.connection;

// connect will retur promise to resolve it , use then and catch

conn.then(()=> {
    console.log('Connected Successfully!');
})
.catch((err) => {
    console.log(`Error in connection ${err}`);
})

// now make the schema for orders database and orderItem:

const orderItemSchema = new mongoose.Schema({
    sku: Number,
    name: String,
    quantity: Number,
    pricing:{
        retail:{
            type:Number
        },
        sale:{
            type:Number
        },
        discount:{
            type:Number
        }
    }
    })

const orderSchema = new  mongoose.Schema({
    user_id: {
        type:mongoose.Schema.Types.ObjectId, 
        ref:'user'
    } ,
    order_items: [orderItemSchema],
    shipping_address:{
        street: {
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        zip:{
            type:String,
            required:true
        }
    },
    total:Number
})

// now create the model 

const OrderModel = new mongoose.model('order', orderSchema);

module.exports = OrderModel;


