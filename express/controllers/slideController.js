// Model
var Slide = require("../models/slideModel");

/* UPLOAD IMAGE */
exports.storeSlideImage = function(req, res) {
    /* Send response with image name */
    res.status(200).json({
        image: req.file.originalname
    });
}

/* CREATE NEW */
exports.createSlide = async (req, res, next) => {
    try {
        /* Create slide instance */
        var slideNew = new Slide({
            title: req.body.title,
            subtitle: req.body.subtitle,
            image: req.body.image,
        });

        /* Save slide to DB */
        const savedSlide = await slideNew.save()

        /* Send response with slide object */
        res.status(201).json( savedSlide );

    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during creating slide --> ', e,'\x1b[0m');
    }
}

/* GET ALL */
exports.getAllSlides = async (req, res, next) => {
    try {
        /* Query to DB - GET slide */
        const slide = await Slide.find();
        if (slide) {
            /* Send response with slide object */
            res.status(200).json( slide )

        } else {
            /* Send error - no list in DB */
            res.status(404).json();
            console.error("\x1b[41m", 'No slides found ','\x1b[0m');
        }

    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during getting all slides --> ', e,'\x1b[0m');
    }
}

/* UPDATE ONE */
exports.updateSlide = async (req, res, next) => {
    try {
        /* Get URL from request */
        const url = req.protocol + "://" + req.get("host");

        /* Handling image path */
        let imagePath = req.body.image;
        if(req.body.image.split('/').length < 2) {
            imagePath = url + "/uploads/" +  req.body.image;
        }
        /* Create a Slide instance */
        const updatedFields = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            image: imagePath
        };

        /* Query to DB - PUT Slide */
        query = { _id: req.params.id }
        await Slide.findOneAndUpdate(query, { $set: updatedFields})
        const updatedSlide = await Slide.findOne({ _id: req.params.id })

        /* Send response with updated Slide object */
        res.status(200).json( updatedSlide )

    } catch(e) {

        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during updating a Slide --> ', e,'\x1b[0m');
    }
}

/* DELETE ONE */
exports.deleteSlide = async (req, res, next) => {
    try {
        /* Query to DB - DELETE slide */
        const deleteSlide = await Slide.findOneAndDelete( {  _id: req.params.id } );

        /* Send response with updated slide object */
        res.status(200).json( deleteSlide )
    } catch(e) {

        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during deleting an slide --> ', e,'\x1b[0m');
    }
}
