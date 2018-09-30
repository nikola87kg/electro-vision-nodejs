// Model
var Group = require("../models/groupModel");

/* UPLOAD IMAGE */
exports.storeGroupImage = function(req, res) {
    res.status(200).json({
        image: req.file.originalname
    });
}

/* CREATE NEW */
exports.createGroup = function(req, res, next) {
    var groupNew = new Group({
        name: req.body.name,
        description: req.body.description,
        slug: req.body.slug,
        category: req.body.category,
        image: "./assets/logo/EV.svg"
    });
    groupNew.save()
        .then( group => {
            res.status(201).json({ object: group });
        })
        .catch( error => {
            res.status(500).json({ object: error });
        })
}

/* GET ALL */
exports.getAllGroups = (req, res, next) => {
    Group.find()
        .populate("category", ["_id", "name"])
        .then( groupList => {
            if( groupList ) {
                res.status(200).json({ object: groupList })
            } else {
                res.status(404).json({ object: { error: 'no group list found' } });
            }
        })
        .catch( error => {
            res.status(500).json({ object: error });
        });
}

/* GET BY SLUG */
exports.getOneGroup = function(req, res, next) {
    Group.findOne({ slug: req.params.slug })
        .populate("category", ["name", "slug"])
        .then( group => {
            if(group) {
                res.status(200).json({ object: group })
            } else {
                res.status(404).json();
            }
        })
        .catch( error => {
            res.status(500).json({ object: error });
        })
}

/* UPDATE ONE */
exports.updateGroup = function(req, res, next) {
    const url = req.protocol + "://" + req.get("host");

    let imagePath = req.body.image;
    if(req.body.image.split('/').length < 2) {
        imagePath = url + "/uploads/" +  req.body.image;
    }
    var groupUpdated = {
        name: req.body.name,
        slug: req.body.slug,
        category: req.body.category,
        description: req.body.description,
        image: imagePath
    };
    Group.findOneAndUpdate({ _id: req.params.id }, { $set: groupUpdated})
        .then( group => {
            res.status(200).json({ object: group })
        })
        .catch( error => {
            res.status(500).json({ object: error });
        })
}

/* DELETE ONE */
exports.deleteGroup = function(req, res, next) {
    Group.findOneAndRemove( {  _id: req.params.id } )
        .then( group => {
            // let folderDest = "./dist/electro-vision/assets/uploads/groups/" + req.params.id + "/";
            // if (fs.existsSync(folderDest)) {
            //     fs.remove(folderDest).then( console.log('deleted Group') );
            // }
            res.status(200).json({ object: group })
        })
        .catch( error => {
            res.status(500).json({ object: error });
        });
}
