// Model
var Group = require("../models/groupModel");

/* UPLOAD IMAGE */
exports.storeGroupImage = function(req, res) {
    /* Send response with image name */
    res.status(200).json({
        image: req.file.originalname
    });
}

/* CREATE NEW */
exports.createGroup = async (req, res, next) => {

    try {
        /* Create group instance */
        const groupNew = new Group({
            name: req.body.name,
            description: req.body.description,
            slug: req.body.slug,
            category: req.body.category,
            image: "./assets/logo/EV.svg"
        });

        /* Save group to DB */
        const savedGroup = await groupNew.save()

        /* Send response with group object */
        res.status(201).json( savedGroup );

    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during creating group --> ', e,'\x1b[0m');
    }
}

/* GET ALL */
exports.getAllGroups = async (req, res, next) => {
    try {
        /* Query to DB - GET group list */
        let groupList = await Group.find().populate("category", ["_id", "name", "slug"])

        if( groupList ) {
            /* Send response with group list object */
            res.status(200).json( groupList );

        } else {
            /* Send error - no list in DB */
            res.status(404).json();
            console.error("\x1b[41m", 'No group list found ','\x1b[0m');
        }
    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during getting all groups --> ', e,'\x1b[0m');
    }
}

/* GET BY SLUG */
exports.getOneGroup = async (req, res, next) => {
    try{
        /* Query to DB - GET group by slug */
        const singleGroup = await Group.findOne({ slug: req.params.slug }).populate("category", ["_id", "name", "slug"])

        if(singleGroup) {
            /* Send response with single group object */
            res.status(200).json( singleGroup )
        } else {
            /* Send error - no group found */
            res.status(404).json();
            console.error("\x1b[41m", 'No single group found','\x1b[0m');
        }
    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during getting single group --> ', e,'\x1b[0m');
    }
}


/* UPDATE ONE */
exports.updateGroup = async (req, res, next) => {
    try {
        /* Get URL from request */
        const url = req.protocol + "://" + req.get("host");

        /* Handling image path */
        let imagePath = req.body.image;
        if(req.body.image.split('/').length < 2) {
            imagePath = url + "/uploads/" +  req.body.image;
        }

        /* Create a group instance */
        const updatedFields = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            slug: req.body.slug,
            image: imagePath
        };

        /* Query to DB - PUT group */
        query = { _id: req.params.id }
        await Group.findOneAndUpdate(query, { $set: updatedFields})
        const updatedGroup = await Group.findOne({ _id: req.params.id })

        /* Send response with updated group object */
        res.status(200).json( updatedGroup )

    } catch(e) {

        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during updating a group --> ', e,'\x1b[0m');
    }
}

/* DELETE ONE */
exports.deleteGroup = async (req, res, next) => {
    try {
        /* Query to DB - DELETE group */
        const deletedGroup = await Group.findOneAndDelete( {  _id: req.params.id } );

        /* Send response with updated group object */
        res.status(200).json( deletedGroup )
    } catch(e) {

        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during deleting a group --> ', e,'\x1b[0m');
    }
}
