// Model
var Order = require("../models/orderModel");

/* CREATE NEW */
exports.createOrder = async (req, res, next) => {
    try {
        /* Create order instance */
        var orderNew = new Order({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            question: req.body.question,
            orderList: req.body.orderList
        });

        /* Save order to DB */
        const savedOrder = await orderNew.save()

        /* Send response with order object */
        res.status(201).json( savedOrder );

    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during creating order --> ', e,'\x1b[0m');
    }
}

/* GET ALL */
exports.getAllOrders = async (req, res, next) => {
    try {
        /* Query to DB - GET order */
        const order = await Order.find();
        if (order) {
            /* Send response with order object */
            res.status(200).json( order )

        } else {
            /* Send error - no list in DB */
            res.status(404).json();
            console.error("\x1b[41m", 'No orders found ','\x1b[0m');
        }

    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during getting all orders --> ', e,'\x1b[0m');
    }
}

/* DELETE ONE */
exports.deleteOrder = async (req, res, next) => {
    try {
        /* Query to DB - DELETE order */
        const deleteOrder = await Order.findOneAndDelete( {  _id: req.params.id } );

        /* Send response with updated order object */
        res.status(200).json( deleteOrder )
    } catch(e) {

        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during deleting an order --> ', e,'\x1b[0m');
    }
}
