// Model
var Pricelist = require("../models/pricelistModel");

/* CREATE NEW */
exports.createPricelist = async (req, res, next) => {
    try {
        /* Create pricelist instance */
        var pricelistNew = new Pricelist({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        });

        /* Save pricelist to DB */
        const savedPricelist = await pricelistNew.save()

        /* Send response with pricelist object */
        res.status(201).json( savedPricelist );

    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during creating pricelist --> ', e,'\x1b[0m');
    }
}

/* GET ALL */
exports.getAllPricelists = async (req, res, next) => {
    try {
        /* Query to DB - GET pricelist list */
        const pricelist = await Pricelist.find();
        if(pricelist) {
            /* Send response with pricelist list object */
            res.status(200).json( pricelist )

        } else {
            /* Send error - no list in DB */
            res.status(404).json();
            console.error("\x1b[41m", 'No pricelist list found ','\x1b[0m');
        }

    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during getting all pricelists --> ', e,'\x1b[0m');
    }
}

/* UPDATE ONE */
exports.updatePricelist = async (req, res, next) => {
    try {
        /* Get URL from request */
        const url = req.protocol + "://" + req.get("host");

        /* Create a pricelist instance */
        var pricelistUpdated = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        };

        /* Query to DB - PUT pricelist */
        const updatedPricelist = await Pricelist.findOneAndUpdate({ _id: req.params.id }, { $set: pricelistUpdated})

        /* Send response with updated pricelist object */
        res.status(200).json( updatedPricelist )

    } catch(e) {

        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during updating a pricelist --> ', e,'\x1b[0m');
    }
}

/* DELETE ONE */
exports.deletePricelist = async (req, res, next) => {
    try {
        /* Query to DB - DELETE pricelist */
        const deletePricelist = await Pricelist.findOneAndDelete( {  _id: req.params.id } );

        /* Send response with updated pricelist object */
        res.status(200).json( deletePricelist )
    } catch(e) {

        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during deleting a pricelist --> ', e,'\x1b[0m');
    }
}
