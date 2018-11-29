// Model
var Category = require("../models/categoryModel");

/* UPLOAD IMAGE */
exports.storeCategoryImage = function(req, res) {
    /* Send response with image name */
    res.status(200).json({
        image: req.file.originalname
    });
}

/* CREATE NEW */
exports.createCategory = async (req, res, next) => {

    try {
        /* Create category instance */
        const categoryNew = new Category({
            name: req.body.name,
            description: req.body.description,
            slug: req.body.slug,
            image: "./assets/logo/EV.svg"
        });

        /* Save category to DB */
        const savedCategory = await categoryNew.save()

        /* Send response with category object */
        res.status(201).json( savedCategory );

    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during creating category --> ', e,'\x1b[0m');
    }
}

/* GET ALL */
exports.getAllCategories = async (req, res, next) => {
    try {
        /* Query to DB - GET category list */
        const categoryList = await Category.find();

        if(categoryList) {
            /* Send response with category list object */
            res.status(200).json( categoryList );

        } else {
            /* Send error - no list in DB */
            res.status(404).json();
            console.error("\x1b[41m", 'No category list found ','\x1b[0m');
        }

    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during getting all categories --> ', e,'\x1b[0m');
    }
}

/* GET BY SLUG */
exports.getOneCategory = async (req, res, next) => {
    try{
        /* Query to DB - GET category by slug */
        const singleCategory = await Category.findOne({ slug: req.params.slug })

        if(singleCategory) {
            /* Send response with single category object */
            res.status(200).json( singleCategory )
        } else {
            /* Send error - no category found */
            res.status(404).json();
            console.error("\x1b[41m", 'No single category found','\x1b[0m');
        }
    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during getting single category --> ', e,'\x1b[0m');
    }
}

/* UPDATE ONE */
exports.updateCategory = async (req, res, next) => {
    try {
        /* Get URL from request */
        const url = req.protocol + "://" + req.get("host");

        /* Handling image path */
        let imagePath = req.body.image;
        if(req.body.image.split('/').length < 2) {
            imagePath = url + "/uploads/" +  req.body.image;
        }
        /* Create a category instance */
        const updatedFields = {
            name: req.body.name,
            description: req.body.description,
            slug: req.body.slug,
            image: imagePath
        };

        /* Query to DB - PUT category */
        query = { _id: req.params.id }
        await Category.findOneAndUpdate(query, { $set: updatedFields})
        const updatedCategory = await Category.findOne({ _id: req.params.id })

        /* Send response with updated category object */
        res.status(200).json( updatedCategory )

    } catch(e) {

        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during updating a category --> ', e,'\x1b[0m');
    }
}

/* DELETE ONE */
exports.deleteCategory = async (req, res, next) => {
    try {
        /* Query to DB - DELETE category */
        const deletedCategory = await Category.findOneAndDelete( {  _id: req.params.id } );

        /* Send response with updated category object */
        res.status(200).json( deletedCategory )
    } catch(e) {

        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during deleting a category --> ', e,'\x1b[0m');
    }
}
