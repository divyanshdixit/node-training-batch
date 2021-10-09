const express = require('express');
const orderModel = require('../modules/order');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.get('/', async(req,res)=>{
    try{
        const allOrders = await orderModel.find({});

        allOrders.map(val => {
            const newTotal = val.order_items.reduce((total, val) => {
                return total + val.price;
            }, 0)
            val.total = newTotal - val.discount;
            // return newTotal
        });

        res.json({
            status:200,
            orders:allOrders
        })

    }catch(err){
        res.send(`Error in getting order: ${err.message}`);
    }
    
})

// uncomment it to run the create api to insert some dummy data in db 

/*
router.post('/create', async (req,res)=>{
    try{
        
        const newOrder = await orderModel.insertMany([
            {
                order_id:uuidv4(),
                order_items: [{
                    item_id:3,
                    price:300
                },
                {
                    item_id:8,
                    price:800
                }],
                address:"Sector 48, Gurgaon",
                discount:100,
            },
            {
                order_id:uuidv4(),
                order_items: [{
                    item_id:1,
                    price:500
                },
                {
                    item_id:2,
                    price:200
                }],
                address:"Sector 48, Gurgaon",
                discount:50,
            }
        ])
        console.log(newOrder);
        res.json({
            status:200,
            data:newOrder
        })
    }catch(err){
        console.log(err);
        res.send(err.message);
    }
    
})
*/

module.exports = router;