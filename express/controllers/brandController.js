// Model
var Brand = require("../models/brandModel");

/* UPLOAD IMAGE */
exports.storeBrandImage =  (req, res) => {
    /* Send response with image name */
    res.status(200).json({
        image: req.file.originalname
    });
}

/* CREATE NEW */
exports.createBrand = async (req, res, next) => {

    try {
        /* Create brand instance */
        const brandNew = new Brand({
            name: req.body.name,
            description: req.body.description,
            slug: req.body.slug,
            vip: req.body.vip,
            image: "./assets/logo/EV.svg"
        });

        /* Save brand to DB */
        const savedBrand = await brandNew.save()

        /* Send response with brand object */
        res.status(201).json( savedBrand );

    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during creating brand --> ', e,'\x1b[0m');
    }
}

/* GET ALL */
exports.getAllBrands = async (req, res, next) => {

    try {
        /* Query to DB - GET brand list */
        const brandList = await Brand.find();
        if(brandList) {
            /* Send response with brand list object */
            res.status(200).json( brandList )

        } else {
            /* Send error - no list in DB */
            res.status(404).json();
            console.error("\x1b[41m", 'No brand list found ','\x1b[0m');
        }

    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during getting all brands --> ', e,'\x1b[0m');
    }
}

/* GET BY SLUG */
exports.getOneBrand = async (req, res, next) => {
    try{
        /* Query to DB - GET brand by slug */
        const singleBrand = await Brand.findOne({ slug: req.params.slug })

        if(singleBrand) {
            /* Send response with single brand object */
            res.status(200).json( singleBrand )
        } else {
            /* Send error - no brand found */
            res.status(404).json();
            console.error("\x1b[41m", 'No single brand found','\x1b[0m');
        }
    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during getting single brand --> ', e,'\x1b[0m');
    }
}

/* UPDATE ONE */
exports.updateBrand = async (req, res, next) => {
    try {
        /* Get URL from request */
        const url = req.protocol + "://" + req.get("host");

        /* Handling image path */
        let imagePath = req.body.image;
        if(req.body.image.split('/').length < 2) {
            imagePath = url + "/uploads/" +  req.body.image;
        }
        /* Create a brand instance */
        const updatedFields = {
            name: req.body.name,
            description: req.body.description,
            slug: req.body.slug,
            vip: req.body.vip,
            image: imagePath
        };

        /* Query to DB - PUT brand */
        query = { _id: req.params.id }
        await Brand.findOneAndUpdate(query, { $set: updatedFields})
        const updatedBrand = await Brand.findOne({ _id: req.params.id })

        /* Send response with updated brand object */
        res.status(200).json( updatedBrand )

    } catch(e) {

        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during updating a brand --> ', e,'\x1b[0m');
    }
}

/* DELETE ONE */
exports.deleteBrand = async (req, res, next) => {

    try {
        /* Query to DB - DELETE brand */
        const deletedBrand = await Brand.findOneAndDelete( {  _id: req.params.id } );

        /* Send response with updated brand object */
        res.status(200).json( deletedBrand )
    } catch(e) {

        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during deleting a brand --> ', e,'\x1b[0m');
    }
}
