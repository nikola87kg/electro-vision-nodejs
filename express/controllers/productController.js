// Model
var Product = require("../models/productModel");

/* UPLOAD IMAGE */
exports.storeProductImage = function(req, res) {
    /* Send response with image name */
    res.status(200).json({
        image: req.file.originalname
    });
}

/* CREATE NEW */
exports.createProduct = async (req, res, next) => {

    try {
        /* Create product instance */
        var productNew = new Product({
            name: req.body.name,
            catalog: req.body.catalog,
            vip: req.body.vip,
            description: req.body.description,
            slug: req.body.slug,
            group: req.body.group,
            category: req.body.category,
            brand: req.body.brand,
            price: req.body.price,
            counter: 0,
            image: "./assets/logo/EV.svg"
        });

        /* Save product to DB */
        const savedProduct = await productNew.save()

        /* Send response with product object */
        res.status(201).json( savedProduct );

    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during creating product --> ', e,'\x1b[0m');
    }
}

/* GET ALL */
exports.getAllProducts = async (req, res, next) => {
    try {
        /* Query to DB - GET product list */
        let productList = await Product.find({ $and: [
            {'group' : { $ne: null}},
            {'category' : { $ne: null}},
            {'brand' : { $ne: null}},
        ]})
            .populate("group", ["_id", "name", "slug"])
            .populate("category", ["_id", "name", "slug"])
            .populate("brand", ["_id", "name", "slug", "image"])

        if( productList ) {
            /* Send response with product list object */
            res.status(200).json( productList );

        } else {
            /* Send error - no list in DB */
            res.status(404).json();
            console.error("\x1b[41m", 'No product list found ','\x1b[0m');
        }
    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during getting all products --> ', e,'\x1b[0m');
    }
}



/* GET BY SLUG */
exports.getOneProduct = async (req, res, next) => {
    try{
        /* Query to DB - GET product by slug */
        const singleProduct = await Product.findOne({ slug: req.params.slug })
                                            .populate("group", ["_id", "name", "slug"])
                                            .populate("category", ["_id", "name", "slug"])
                                            .populate("brand", ["_id", "name", "slug", "image"])

        if(singleProduct) {

            /* Query to DB - UPDATE counter */
            query = { _id: singleProduct._id }
            await Product.findOneAndUpdate(query, { $set: {counter: singleProduct.counter + 1}})

            /* Send response with single product object */
            res.status(200).json( singleProduct )
        } else {
            /* Send error - no product found */
            res.status(404).json();
            console.error("\x1b[41m", 'No single product found','\x1b[0m');
        }
    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during getting single product --> ', e,'\x1b[0m');
    }
}

/* UPDATE ONE */
exports.updateProduct = async (req, res, next) => {
    try {
        /* Get URL from request */
        const url = req.protocol + "://" + req.get("host");

        /* Handling image path */
        let imagePath = req.body.image;
        if(req.body.image.split('/').length < 2) {
            imagePath = url + "/uploads/" +  req.body.image;
        }

        /* Create a product instance */
        var updatedFields = {
            name: req.body.name,
            catalog: req.body.catalog,
            vip: req.body.vip,
            slug: req.body.slug,
            category: req.body.category,
            brand: req.body.brand,
            price: req.body.price,
            group: req.body.group,
            description: req.body.description,
            image: imagePath
        };
        /* Query to DB - PUT product */
        query = { _id: req.params.id }
        await Product.findOneAndUpdate(query, { $set: updatedFields})
        const updatedProduct = await Product.findOne({ _id: req.params.id })

        /* Send response with updated product object */
        res.status(200).json( updatedProduct )

    } catch(e) {

        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during updating a product --> ', e,'\x1b[0m');
    }
}

/* DELETE ONE */
exports.deleteProduct = async (req, res, next) => {
    try {
        /* Query to DB - DELETE product */
        const deletedProduct = await Product.findOneAndDelete( {  _id: req.params.id } );

        /* Send response with updated product object */
        res.status(200).json( deletedProduct )
    } catch(e) {

        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during deleting a product --> ', e,'\x1b[0m');
    }
}
